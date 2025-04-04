import React, { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import Card from "./Card";

import { Settings, Globe } from "lucide-react";

interface MainFormProps {
  // onAnalyze: (url: string) => Promise<void>;
  areApiKeysSet: boolean;
  transparent?: boolean;
  label?: string;
  placeholder?: string;
  subText?: string;
  apiRequiredText?: string;
  submitButtonText?: string;
  warningTitle?: string;
  customButton?: React.ReactNode;
  outputSectionRef?: React.RefObject<HTMLDivElement | null>;
  onUrlChange?: (url: string) => void;
  onFormSubmit?: () => void;
}

const MainForm: React.FC<MainFormProps> = ({
  // onAnalyze,
  areApiKeysSet,
  transparent = false,
  label,
  placeholder = "https://firecrawl.dev",
  subText = "This is a helper text",
  apiRequiredText = "Click the settings button in the bottom right corner to configure your API keys before analyzing.",
  submitButtonText = "Analyze Content",
  warningTitle = "API Keys Required",
  customButton,
  outputSectionRef,
  onUrlChange,
  onFormSubmit,
}) => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Handler for URL input changes
  const handleUrlChange = (value: string) => {
    setUrl(value);
    if (onUrlChange) {
      onUrlChange(value);
    }
    setError(""); // Clear error when user types
  };

  const validateAndFormatUrl = (
    input: string,
  ): { isValid: boolean; formattedUrl: string } => {
    // Trim whitespace
    let formattedUrl = input.trim();

    // Check if URL has a protocol, if not add https://
    if (!/^(?:f|ht)tps?:\/\//i.test(formattedUrl)) {
      formattedUrl = `https://${formattedUrl}`;
    }

    // Now validate the URL
    try {
      new URL(formattedUrl);
      return { isValid: true, formattedUrl };
    } catch (e) {
      return { isValid: false, formattedUrl };
    }
  };

  // Function to scroll to output section
  const scrollToOutput = () => {
    // Only scroll if the ref exists and points to a DOM element
    if (outputSectionRef?.current) {
      // Set a slight delay to ensure analysis results are rendered before scrolling
      setTimeout(() => {
        const navbarHeight = 80; // Approximate navbar height

        // Use scrollIntoView with a specific offset
        outputSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Add a small additional offset to prevent getting stuck under the navbar
        setTimeout(() => {
          window.scrollBy({
            top: -navbarHeight,
            behavior: "smooth",
          });
        }, 100);
      }, 200);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset error state
    setError("");

    // Check if API keys are configured
    if (!areApiKeysSet) {
      setError("Please configure your API keys first");
      return;
    }

    // Validate URL
    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    const { isValid, formattedUrl } = validateAndFormatUrl(url);

    if (!isValid) {
      setError("Please enter a valid URL");
      return;
    }

    // Update the input field with the formatted URL (with protocol)
    handleUrlChange(formattedUrl);

    setIsLoading(true);

    try {
      // await onAnalyze(formattedUrl);
      // Scroll to output section after successful analysis
      if (onFormSubmit) {
        onFormSubmit();
      }
    } catch (err: any) {
      console.error("Analysis error:", err);

      // Handle specific error cases
      if (err?.response?.status === 401) {
        setError(
          "Invalid API key. Please check your Firecrawl API key and try again.",
        );
      } else if (err?.response?.status === 500) {
        setError("Server error. Please try again later.");
      } else if (err?.message) {
        setError(err.message);
      } else {
        setError("Failed to analyze the website. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const displayLabel =
    label || (transparent ? "Enter Website URL" : "Website URL");

  return (
    <div className='max-w-xl mx-auto pt-10'>
      <Card
        className={`${
          transparent
            ? "bg-white/30 backdrop-blur-md dark:bg-gray-800/30 border-white/20 shadow-xl"
            : "shadow-lg border border-orange-100/50 bg-white/40"
        }`}>
        <form
          onSubmit={handleSubmit}
          className={`${transparent ? "py-4" : "py-6"} space-y-6`}>
          <div className='relative'>
            <Input
              label={displayLabel}
              value={url}
              onChange={(e) => {
                handleUrlChange(e.target.value);
              }}
              placeholder={placeholder}
              fullWidth
              required
              error={!!error}
              helperText={error || subText}
              icon={<Globe size={22} className='text-orange-500' />}
              className={`text-lg py-4 h-16 ${
                transparent ? "bg-white/60 dark:bg-gray-700/50" : "bg-white/80"
              }`}
              typewriterEffect={true}
              isUrl={true}
              showEnterIcon={true}
              onEnterSubmit={(value) => {
                handleUrlChange(value);

                if (areApiKeysSet && value.trim()) {
                  // Create a synthetic form event and call handleSubmit directly
                  const syntheticEvent = {
                    preventDefault: () => {},
                  } as React.FormEvent;

                  handleSubmit(syntheticEvent);
                }
              }}
            />
          </div>

          {customButton ? (
            customButton
          ) : (
            <Button
              type='submit'
              isLoading={isLoading}
              fullWidth
              size='lg'
              squared={transparent}
              className={
                transparent
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 h-16 text-lg mt-2"
                  : "h-16 text-lg mt-2"
              }
              disabled={!areApiKeysSet}
              buttonContent={
                !areApiKeysSet
                  ? "Configure API Keys First"
                  : isLoading
                  ? "Loading..."
                  : submitButtonText
              }
            />
          )}

          {!areApiKeysSet && (
            <div
              className={`mt-4 p-4 rounded-lg ${
                transparent
                  ? "bg-amber-50/70 border border-amber-200/60"
                  : "bg-amber-50/90 border border-amber-200/70"
              }`}>
              <div className='flex items-start'>
                <div className='flex-shrink-0 mt-0.5'>
                  <Settings size={18} className='text-amber-500' />
                </div>
                <div className='ml-3'>
                  <h3 className='text-sm font-medium text-amber-800'>
                    {warningTitle}
                  </h3>
                  <div className='mt-1 text-sm text-amber-700'>
                    <p>{apiRequiredText}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>
      </Card>
    </div>
  );
};

export default MainForm;
