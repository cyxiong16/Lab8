describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    await page.click('journal-entry');
    expect(page.url()).toBe('http://127.0.0.1:5500/#entry1');
  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1”
    const header = await page.$eval('body > header > h1', el => el.textContent);
    expect(header).toBe('Entry 1');
  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */
     const entry = await page.$eval('body > entry-page', el => el.entry);
     const entryReal = { 
      title: 'You like jazz?',
      date: '4/25/2021',
      content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
      image: {
        src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
        alt: 'bee with sunglasses'
      }
    };
    expect(entry).toEqual(entryReal);
  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    const att = await page.$eval('body', el => el.className);
    expect(att).toBe('single-entry');
  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    await page.click('body > header > img');
    const url = await page.url();
    expect(url).toBe('http://127.0.0.1:5500/#settings');
  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    const header = await page.$eval('body > header > h1', el => el.textContent);
    expect(header).toBe('Settings');
  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    const att = await page.$eval('body', el => el.className);
    expect(att).toBe('settings');
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack();
    expect(page.url()).toBe('http://127.0.0.1:5500/#entry1');
  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('Test11: Clicking the back button once should bring the user back to the home page', async() => {
    await page.goBack();
    expect(page.url()).toBe('http://127.0.0.1:5500/');
  });

  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it('Test12: When the user if on the homepage, the header title should be “Journal Entries”', async() => {
    const header = await page.$eval('header > h1', (h) => {
      return h.innerHTML;
    });
    
    expect(header).toBe('Journal Entries');
  });

  // define and implement test13: On the home page the <body> element should not have any class attribute
  it('Test13: On the home page the <body> element should not have any class attribute', async() => {
    const classAtt = await page.$eval('body', el => el.className);
    expect(classAtt).toBe("");
  });

  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('Test14: Verify the url is correct when clicking on the second entry', async() => {
    await page.click('journal-entry:nth-child(2)');
    const url = await page.url();
    expect(url).toBe('http://127.0.0.1:5500/#entry2');
  });

  // define and implement test15: Verify the title is current when clicking on the second entry
  it('Test15: Verify the title is current when clicking on the second entry', async() => {
    //await page.click('journal-entry:nth-child(2)');
    const title = await page.$eval('body > header > h1', el => el.textContent);
    expect(title).toBe('Entry 2');
  });

  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('Test16: Verify the entry page contents is correct when clicking on the second entry', async() => {
    //await page.click('journal-entry:nth-child(2)');
    const content = await page.$eval('body > entry-page', el => el.entry);
    const contentReal = { 
      title: 'Run, Forrest! Run!',
      date: '4/26/2021',
      content: "Mama always said life was like a box of chocolates. You never know what you're gonna get.",
      image: {
        src: 'https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg',
        alt: 'forrest running'
      }
    };
    expect(content).toEqual(contentReal);
  });

  // create your own test 17
  it('Test17: Verify the url is correct when clicking on the header', async() => {
    await page.click('header > h1');
    const url = await page.url();
    expect(url).toBe('http://127.0.0.1:5500/');
  });

  // create your own test 18
  it('Test18: Verify the url is correct when clicking on the third entry', async() => {
    await page.click('journal-entry:nth-child(3)');
    const url = await page.url();
    expect(url).toBe('http://127.0.0.1:5500/#entry3');
  });

  // create your own test 19
  it('Test19: Verify the title is current when clicking on the third entry', async() => {
    //await page.click('journal-entry:nth-child(3)');
    const title = await page.$eval('body > header > h1', el => el.textContent);
    expect(title).toBe('Entry 3');
  });

  // create your own test 20
  it('Test20: Verify the entry page contents is correct when clicking on the third entry', async() => {
    //await page.click('journal-entry:nth-child(3)');
    const content = await page.$eval('body > entry-page', el => el.entry);
    const contentReal = { 
      title: 'Ogres are like onions',
      date: '4/27/2021',
      content: "Onions have layers. Ogres have layers. Onions have layers. You get it? We both have layers.",
      image: {
        src: 'https://advancelocal-adapter-image-uploads.s3.amazonaws.com/image.syracuse.com/home/syr-media/width2048/img/entertainment_impact/photo/shrek-donkeyjpg-daa31aa2b5bedfaa.jpg',
        alt: 'shrek and donkey looking confused'
      }
    };
    expect(content).toEqual(contentReal);
  });
  
});