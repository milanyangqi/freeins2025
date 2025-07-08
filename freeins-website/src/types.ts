import type { Metadata, ResolvingMetadata } from 'next';

export interface PageParams {
  locale: string;
}

export type AppPageProps = {
  params: PageParams;
  searchParams?: Record<string, string | string[]>;
};


export type AppGenerateMetadata = (
  { params, searchParams }: {
    params: PageParams;
    searchParams?: Record<string, string | string[]>;
  },
  parent?: ResolvingMetadata
) => Promise<Metadata>;