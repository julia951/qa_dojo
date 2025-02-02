import { test as spec } from './fixture'

spec("PWD-001 Test GetStarted Link Visibility", async ( { playWrApp } ) => {
  await playWrApp.navigate();

  await playWrApp.checkGetStartedLinkVisibility();
});

spec("PWD-002 Test Banner Contains GetStarted Text", async ({ playWrApp }) => {
  await playWrApp.navigate();

  await playWrApp.checkElementText(playWrApp.bannerHeader, "Get started"); 
});

spec("PWD-003 Test Search Input Value", async ({ playWrApp }) => {
  await playWrApp.navigate();
  await playWrApp.performSearch(playWrApp.testSearchQueries.valid);

  await playWrApp.validateSearchInputValue(playWrApp.testSearchQueries.valid);
});

spec("PWD-004 Test NoResults For Search", async ({ playWrApp }) => {
  await playWrApp.navigate();
  await playWrApp.performSearch(playWrApp.testSearchQueries.invalid);

  await playWrApp.validateNoSearchResults(playWrApp.testSearchQueries.invalid);
});

spec("PWD-005 Test Docs Page Navigation", async ({ playWrApp }) => {
  await playWrApp.navigate();
  await playWrApp.clickIntro();

    await playWrApp.checkHeaderContainsText("Installation"); 
});

spec("PWD-007 Test API Page Navigation", async ({ playWrApp }) => {
  await playWrApp.navigate();
  await playWrApp.apiLink.click();

  await playWrApp.checkHeaderContainsText("Welcome"); 
});

spec("PWD-009 Test Programming Languages -> Java Navigation", async ({ playWrApp }) => {
  await playWrApp.navigate();
  await playWrApp.hoverOnLanguageDropdown(); 
  await playWrApp.navigateToLanguage("java");

  await playWrApp.checkElementText(playWrApp.languageDropdownLocator, "Java");  
});

spec("PWD-010 Test Programming Languages -> Python Navigation", async ({ playWrApp }) => {
  await playWrApp.navigate();
  await playWrApp.hoverOnLanguageDropdown(); 
  await playWrApp.navigateToLanguage("python");

  await playWrApp.checkElementText(playWrApp.languageDropdownLocator, "Python");  
});

spec("PWD-011 Test Programming Languages -> .NET Navigation", async ({ playWrApp }) => {
  await playWrApp.navigate();
  await playWrApp.hoverOnLanguageDropdown(); 
  await playWrApp.navigateToLanguage("dotnet");

  await playWrApp.checkElementText(playWrApp.languageDropdownLocator, ".NET");  

});

spec('PWD-012 Test Community Page Navigation', async ({ playWrApp }) => {

  const writingTestsText = 'Welcome';

  await playWrApp.navigate();
  await playWrApp.navigateToCommunityPage(); 

  await playWrApp.checkHeaderContainsText(writingTestsText);
});

spec("PWD-013 Footer -> Getting started Page Navigation", async ({ playWrApp }) => {
  await playWrApp.navigate();
  await playWrApp.navigateToFooterLink("Getting started");

  await playWrApp.checkHeaderContainsText("Installation"); 
});

spec('PWD-014 Test Footer -> Learn Videos Page Navigation', async ({ playWrApp }) => {
  const learnVideosText = 'Learn Videos';

  await playWrApp.navigate();
  await playWrApp.navigateToLearnVideos(); 

  await playWrApp.checkHeaderContainsText(learnVideosText); 
});

spec('PWD-015 Test Footer->Feature Videos Page Navigation', async ({ playWrApp }) => {
  const featureVideosText = 'Feature Videos';

  await playWrApp.navigate();
  await playWrApp.navigateToFeatureVideos(); 

  await playWrApp.checkHeaderContainsText(featureVideosText); 
});

spec('PWD-016 Test Landing->TypeScript Page Navigation', async ({ playWrApp }) => {
  const headerText = 'Installation';
  
  await playWrApp.navigate();
  await playWrApp.navigateToLanguagePageName("TypeScript");  

  await playWrApp.checkHeaderContainsText(headerText);
  await playWrApp.checkLanguageInDropdown("Node.js"); 
});


spec('PWD-017 Test Landing->JavaScript Page Navigation', async ({ playWrApp }) => {
  const headerText = 'Installation';

  await playWrApp.navigate();
  await playWrApp.navigateToLanguagePageName("JavaScript");  

  await playWrApp.checkHeaderContainsText(headerText); 
  await playWrApp.checkLanguageInDropdown("Node.js"); 
});

spec('PWD-018 Test Landing->Python Page Navigation', async ({ playWrApp }) => {
  const headerText = 'Installation';
  const pythonText = 'Python';

  await playWrApp.navigate();
  await playWrApp.navigateToLanguagePage(pythonText.toLowerCase());  

  await playWrApp.checkHeaderContainsText(headerText);
  await playWrApp.checkLanguageInDropdown(pythonText); 
});

spec('PWD-019 Test Landing -> .NET Page Navigation', async ({ playWrApp }) => {
  const headerText = 'Installation';

  await playWrApp.navigate();
  await playWrApp.navigateToLanguagePage("dotnet"); 

  await playWrApp.checkHeaderContainsText(headerText); 
  await playWrApp.checkLanguageInDropdown(".NET"); 
});

spec('PWD-020 Test Landing -> Java Page Navigation', async ({ playWrApp }) => {
  const headerText = 'Installation';
  const javaText = 'Java';

  await playWrApp.navigate();
  await playWrApp.navigateToLanguagePage(javaText.toLowerCase()); 
  await playWrApp.checkHeaderContainsText(headerText); 

  await playWrApp.checkLanguageInDropdown(javaText); 
});