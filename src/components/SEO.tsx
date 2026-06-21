import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
}

const SEO = ({ title, description, image }: SEOProps) => {
  const defaultImage = "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/bb3e19d6-836d-4b19-b6bc-1180179b1279";
  const ogImage = image || defaultImage;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default SEO;
