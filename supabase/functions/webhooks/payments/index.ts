// Payment webhook handler for various payment gateways
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const { gateway, event, data } = await req.json()

    // Handle different payment gateways
    switch (gateway) {
      case 'stripe':
        return await handleStripeWebhook(supabaseClient, event, data)
      case 'mpesa':
        return await handleMpesaWebhook(supabaseClient, event, data)
      case 'paypal':
        return await handlePayPalWebhook(supabaseClient, event, data)
      default:
        throw new Error(`Unsupported payment gateway: ${gateway}`)
    }
  } catch (error) {
    console.error('Payment webhook error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})

async function handleStripeWebhook(supabaseClient: any, event: string, data: any) {
  // Handle Stripe webhook events
  switch (event) {
    case 'payment_intent.succeeded':
      // Update payment status in database
      const { error } = await supabaseClient
        .from('payments')
        .update({ 
          status: 'completed',
          metadata: { stripe_event: event, ...data }
        })
        .eq('transaction_id', data.id)
      
      if (error) throw error
      break
      
    case 'payment_intent.payment_failed':
      // Handle failed payment
      const { error: updateError } = await supabaseClient
        .from('payments')
        .update({ 
          status: 'failed',
          metadata: { stripe_event: event, ...data }
        })
        .eq('transaction_id', data.id)
      
      if (updateError) throw updateError
      break
  }

  return new Response(
    JSON.stringify({ success: true }),
    { 
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    },
  )
}

async function handleMpesaWebhook(supabaseClient: any, event: string, data: any) {
  // Handle M-Pesa webhook events
  // Implementation for M-Pesa specific logic
  return new Response(
    JSON.stringify({ success: true }),
    { 
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    },
  )
}

async function handlePayPalWebhook(supabaseClient: any, event: string, data: any) {
  // Handle PayPal webhook events
  // Implementation for PayPal specific logic
  return new Response(
    JSON.stringify({ success: true }),
    { 
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    },
  )
}
