'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import axios from 'axios';
import { Box, Typography, Alert } from '@mui/material';

interface PageContent {
  title: string;
  content: string;
}

export default function ContactContent() {
  const locale = useLocale();
  const [pageContent, setPageContent] = useState<PageContent | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactContent = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/pages?slug=contact&locale=${locale}`
        );

        if (response.data.length > 0) {
          setPageContent(response.data[0]);
        } else {
          setError('Contact page content not found');
        }
      } catch (err) {
        setError('Failed to load contact page content');
        console.error('Error fetching contact content:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContactContent();
  }, [locale]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
        <Typography>Loading contact information...</Typography>
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>;
  }

  if (!pageContent) {
    return <Alert severity="warning" sx={{ my: 2 }}>No content available for this page.</Alert>;
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 4 }}>
      <Typography variant="h2" component="h1" sx={{ mb: 4 }}>
        {pageContent.title}
      </Typography>
      <Box
        sx={{ typography: 'body1', '& p': { mb: 2 }, '& h2': { mt: 4, mb: 2 } }}
        dangerouslySetInnerHTML={{ __html: pageContent.content }}
      />
    </Box>
  );
}