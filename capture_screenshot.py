from playwright.sync_api import sync_playwright
import time

url = 'http://localhost:8000'
output = 'hero_screenshot.png'

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width':1280,'height':800})
    page.goto(url, wait_until='networkidle')
    # give site a moment for fonts/images
    time.sleep(0.5)
    page.screenshot(path=output, full_page=True)
    browser.close()
print('screenshot saved to', output)
