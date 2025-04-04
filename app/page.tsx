"use client";

import React, { useState, useRef, useEffect } from "react";
import Navbar from "./components/Navbar";
import BgGradient from "./components/BgGradient";
import Header from "./components/Header";
import SubHeader from "./components/SubHeader";
import IntegrationDetails from "./components/IntegrationDetails";
import IntegrationDetailsGroup from "./components/IntegrationDetailsGroup";
import MainForm from "./components/MainForm";
import Button from "./components/Button";
import ApiKeySidebar from "./components/ApiKeySidebar";
import OutputSection from "./components/OutputSection";

const Page = () => {
  const [apiKeysConfigured, setApiKeysConfigured] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const outputSectionRef = useRef<HTMLDivElement>(null);

  // scroll-On Button Click

  // useEffect(() => {
  //   document.documentElement.style.setProperty("--navbar-height", "80px");
  //   document.documentElement.style.setProperty(
  //     "scroll-padding-top",
  //     "var(--navbar-height)",
  //   );

  //   document.documentElement.classList.add("smooth-scroll");

  //   return () => {
  //     document.documentElement.classList.remove("smooth-scroll");
  //   };
  // }, []);

  const handleApiKeySet = (firecrawlKey: string) => {
    console.log("API Key set:", firecrawlKey.substring(0, 5) + "...");
    setApiKeysConfigured(true);
  };

  // Track URL input changes
  const handleUrlChange = (url: string) => {
    setUrlInput(url);
  };

  // Called when the form is successfully submitted
  const handleFormSubmit = () => {
    console.log("Form submitted with URL:", urlInput);
    if (urlInput.trim()) {
      setShowOutput(true);
    }
  };

  return (
    <>
      <Navbar appName='Sample App' appNameColor='black' />
      <ApiKeySidebar
        onApiKeySet={handleApiKeySet}
        apiKeysConfigured={apiKeysConfigured}
      />
      <BgGradient>
        <div className='min-h-screen flex flex-col'>
          <div className='flex-1'>
            <Header content='Sample Firecrawl App' />
            <SubHeader content='Analyze your website with Firecrawl, This is a sample sub heading!' />

            <IntegrationDetailsGroup
              items={[
                "Integration Detail 1",
                "Integration Detail 2",
                "Integration Detail 3",
              ]}
            />

            <MainForm
              areApiKeysSet={apiKeysConfigured}
              onUrlChange={handleUrlChange}
              onFormSubmit={handleFormSubmit}
              customButton={
                <Button
                  type='submit'
                  size='lg'
                  variant='primary'
                  buttonContent={
                    apiKeysConfigured
                      ? "My Custom Button Text"
                      : "Please Configure Your API Keys"
                  }
                  fullWidth
                  className='h-16 text-lg'
                  disabled={!apiKeysConfigured || !urlInput.trim()}
                />
              }
              outputSectionRef={outputSectionRef}
            />
          </div>

          {showOutput && urlInput.trim() && (
            <OutputSection
              ref={outputSectionRef}
              title='Sample Output Header'
              className='transition-opacity duration-500'></OutputSection>
          )}
        </div>
      </BgGradient>
    </>
  );
};

export default Page;
