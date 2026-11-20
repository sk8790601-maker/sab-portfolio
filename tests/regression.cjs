const assert = require('node:assert/strict');
const { chromium } = require('playwright');

const base = process.env.BASE_URL || 'http://127.0.0.1:5173';

async function main() {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const errors = [];
  const results = [];
  const newPage = async (options) => {
    const page = await browser.newPage(options);
    page.on('pageerror', error => errors.push(error.message));
    return page;
  };
  const visit = async (page, route = '/') => {
    await page.goto(base + route);
    await page.waitForTimeout(2400);
  };
  try {
    for (const width of [1440, 768, 390]) {
      const page = await newPage({ viewport: { width, height: 900 } });
      await visit(page);
      assert.equal(await page.getByRole('status', { name: 'Loading portfolio' }).count(), 0);
      for (const section of ['hero', 'about', 'works', 'videos', 'skills', 'process', 'contact']) {
        await page.locator('#' + section).scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);
      }
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      assert.deepEqual(await page.locator('img').evaluateAll(images => images.filter(i => !i.complete || !i.naturalWidth).map(i => i.src)), []);
      const layer = page.locator('[data-scroll-project-layer]').first();
      await layer.scrollIntoViewIfNeeded();
      await page.waitForTimeout(800);
      const before = await layer.evaluate(e => getComputedStyle(e).transform);
      await page.evaluate(() => scrollBy(0, 200));
      await page.waitForTimeout(900);
      assert.notEqual(await layer.evaluate(e => getComputedStyle(e).transform), before);
      await page.locator('#works').getByRole('button', { name: 'Virtual Reality', exact: true }).click();
      assert.equal(await page.locator('#works article').count(), 2);
      await page.locator('#works').getByRole('button', { name: 'All', exact: true }).click();
      assert.equal(await page.locator('#works article').count(), 6);
      await page.locator('#about button[aria-expanded]').last().click();
      assert.equal(await page.locator('#about button[aria-expanded=true]').count(), 1);
      await page.locator('#process button').last().click();
      await page.getByText('Reflect, improve and keep exploring.', { exact: true }).last().waitFor();
      if (width === 390) {
        await page.evaluate(() => scrollTo(0, 0));
        await page.getByRole('button', { name: /open.*menu/i }).click();
        await page.getByRole('button', { name: /close.*menu/i }).click();
      }
      results.push(`Responsive layout, scroll scenes, filters, accordion, process: ${width}px`);
      await page.close();
    }

    const page = await newPage();
    await visit(page);
    for (let i = 0; i < 5; i++) {
      await page.locator('#videos article').nth(i).getByRole('button').first().click();
      await page.waitForFunction(() => {
        const v = document.querySelector('[role=dialog] video');
        return v && !v.paused && v.currentTime > 0.1;
      });
      await page.getByRole('button', { name: 'Pause video', exact: true }).click();
      assert.equal(await page.locator('[role=dialog] video').evaluate(v => v.paused), true);
      await page.getByRole('button', { name: 'Play video', exact: true }).click();
      await page.getByRole('button', { name: 'Unmute video', exact: true }).click();
      assert.equal(await page.locator('[role=dialog] video').evaluate(v => v.muted), false);
      await page.getByRole('slider', { name: 'Seek video timeline' }).fill('2');
      await page.keyboard.press('Escape');
      await page.waitForTimeout(400);
    }
    results.push('All five videos: playback, pause/resume, audio, seeking, Escape dismissal');
    await page.locator('#videos').getByRole('button', { name: 'Product Showcase', exact: true }).click();
    assert.equal(await page.locator('#videos article').count(), 2);
    const form = page.locator('#contact form');
    await form.locator('input').nth(0).fill('Regression Test');
    await form.locator('input').nth(1).fill('test@example.com');
    await form.locator('input').nth(2).fill('Immersive concept');
    await form.locator('textarea').fill('Checking client-side validation without message delivery.');
    await form.locator('button[type=submit]').click();
    await page.getByText(/Demo Validation Passed/).waitFor();
    results.push('Video category filter and client-side form validation');
    await visit(page, '/projects');
    await page.getByRole('searchbox').fill('Metaverse');
    assert.equal(await page.locator('main article').count(), 1);
    const { PROJECTS } = await import('../frontend/src/data/projects.js');
    for (const project of PROJECTS) {
      await visit(page, '/projects/' + project.slug);
      assert.equal(await page.locator('main h1').innerText(), project.title);
      assert.equal(await page.locator('main article').count(), 2);
    }
    await visit(page, '/projects/not-a-project');
    assert.equal(await page.locator('main h1').innerText(), 'Project Not Found');
    results.push('Archive search, all six project detail routes, related projects, missing project');
    await page.close();

    const reduced = await newPage({ reducedMotion: 'reduce' });
    await visit(reduced);
    assert.deepEqual(await reduced.locator('[data-scroll-project-layer]').evaluateAll(es => es.map(e => getComputedStyle(e).transform)), Array(6).fill('none'));
    assert.equal(await reduced.locator('.animate-marquee-track').evaluate(e => getComputedStyle(e).animationName), 'none');
    await reduced.close();
    assert.deepEqual(errors, []);
    results.push('Reduced-motion handling; no browser runtime errors');
    console.log(results.map(r => 'PASS ' + r).join('\n'));
  } finally {
    await browser.close();
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
