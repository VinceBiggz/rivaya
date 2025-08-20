import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display the main content', async ({ page }) => {
    await page.goto('/');
    
    // Check main heading
    await expect(page.getByText('RIVAYA')).toBeVisible();
    await expect(page.getByText('AI-Powered Group Management')).toBeVisible();
    
    // Check description
    await expect(
      page.getByText('Revolutionizing how families, alumni, SACCOs, and friends stay connected across any distance.')
    ).toBeVisible();
    
    // Check CTA buttons
    await expect(page.getByRole('button', { name: 'Get Started Free' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Watch Demo' })).toBeVisible();
  });

  test('should have proper page title and meta', async ({ page }) => {
    await page.goto('/');
    
    await expect(page).toHaveTitle('RIVAYA - AI-Powered Group Management');
    
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute(
      'content',
      'Revolutionizing how families, alumni, SACCOs, and friends stay connected across any distance.'
    );
  });

  test('should be accessible', async ({ page }) => {
    await page.goto('/');
    
    // Check for proper heading structure
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    
    // Check for proper button types
    const buttons = page.locator('button');
    await expect(buttons).toHaveCount(2);
    
    for (const button of await buttons.all()) {
      await expect(button).toHaveAttribute('type', 'button');
    }
  });
});
