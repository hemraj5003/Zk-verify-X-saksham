
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
const cybersecurityBlogs = [
    {
      category: "Network Security",
      title: "Understanding Zero-Day Exploits: The Silent Threats",
      short_description: "An in-depth look at zero-day vulnerabilities and how they pose unprecedented risks to organizational security.",
      cover_image_url: "/images/zero-day-security.jpg",
      blog: "Zero-day exploits remain one of the most critical threats in cybersecurity. These vulnerabilities, unknown to software vendors, create windows of opportunity for attackers to compromise systems before patches can be developed. Understanding these threats requires knowledge of how attackers discover and exploit such vulnerabilities, and the impact they can have on organizational security. This post explores detection strategies, mitigation techniques, and the importance of robust security practices in defending against zero-day threats."
    },
    {
      category: "Threat Intelligence",
      title: "Advanced Persistent Threats: Modern Attack Vectors",
      short_description: "Examining sophisticated APT groups and their evolving tactics in cybersecurity warfare.",
      cover_image_url: "/images/apt-threats.jpg",
      blog: "Advanced Persistent Threats (APTs) represent some of the most sophisticated cyber attack campaigns. These carefully orchestrated attacks often involve state-sponsored actors and target specific organizations or sectors. This analysis covers recent APT campaigns, their technical sophistication, and the multi-staged approach they employ. Understanding these threats is crucial for developing effective defense strategies and incident response plans."
    },
    {
      category: "Application Security",
      title: "Secure Software Development: Best Practices and Pitfalls",
      short_description: "Essential security practices for developing robust and secure applications in today's threat landscape.",
      cover_image_url: "/images/secure-development.jpg",
      blog: "Security must be integrated throughout the software development lifecycle to create robust applications. This post examines essential secure coding practices, common vulnerabilities to avoid, and the implementation of security testing in the development pipeline. Topics include input validation, authentication mechanisms, secure session management, and the principle of least privilege in application design."
    },
    {
      category: "Cloud Security",
      title: "Cloud Infrastructure Security: Protecting Virtual Assets",
      short_description: "Comprehensive guide to securing cloud infrastructure and preventing common cloud-based attacks.",
      cover_image_url: "/images/cloud-security.jpg",
      blog: "As organizations continue to migrate to cloud environments, understanding cloud security becomes crucial. This article explores the unique challenges of securing cloud infrastructure, including identity management, data encryption, access controls, and compliance requirements. Learn about cloud-specific threats and implementing effective security measures in cloud environments."
    },
    {
      category: "Incident Response",
      title: "Effective Incident Response: From Detection to Recovery",
      short_description: "A structured approach to handling security incidents and maintaining business continuity.",
      cover_image_url: "/images/incident-response.jpg",
      blog: "Incident response is critical in minimizing the impact of security breaches. This guide covers the entire incident response lifecycle, from initial detection through containment, eradication, and recovery. Learn about creating effective incident response plans, establishing response teams, and implementing post-incident analysis for continuous improvement."
    },
    {
      category: "Security Architecture",
      title: "Zero Trust Architecture: Beyond Perimeter Security",
      short_description: "Implementing Zero Trust principles for enhanced organizational security.",
      cover_image_url: "/images/zero-trust.jpg",
      blog: "Zero Trust architecture represents a paradigm shift in security thinking, moving away from traditional perimeter-based security models. This post examines the core principles of Zero Trust, including never trust, always verify, least privilege access, and micro-segmentation. Learn how to implement these principles in your organization's security architecture."
    },
    {
      category: "Malware Analysis",
      title: "Modern Malware Analysis Techniques",
      short_description: "Advanced approaches to analyzing and understanding modern malware threats.",
      cover_image_url: "/images/malware-analysis.jpg",
      blog: "Modern malware analysis requires sophisticated techniques to understand and combat evolving threats. This article covers static and dynamic analysis methods, reverse engineering techniques, and tools used in malware analysis. Learn about analyzing malware behavior, identifying indicators of compromise, and developing effective detection signatures."
    },
    {
      category: "Security Testing",
      title: "Penetration Testing: Beyond the Basics",
      short_description: "Advanced penetration testing methodologies for comprehensive security assessment.",
      cover_image_url: "/images/pentest.jpg",
      blog: "Effective penetration testing requires a methodical approach to identifying and exploiting security vulnerabilities. This guide covers advanced penetration testing techniques, including network enumeration, vulnerability assessment, exploitation, and post-exploitation activities. Learn about the latest tools and methodologies used in professional penetration testing."
    },
    {
      category: "Threat Hunting",
      title: "Proactive Threat Hunting: Finding Hidden Adversaries",
      short_description: "Advanced techniques for identifying and tracking sophisticated cyber threats.",
      cover_image_url: "/images/threat-hunting.jpg",
      blog: "Threat hunting has become an essential practice in modern cybersecurity. This post explores proactive threat hunting techniques, including the use of threat intelligence, behavioral analysis, and advanced detection tools. Learn how to develop effective threat hunting programs and identify sophisticated adversaries in your environment."
    },
    {
      category: "Security Operations",
      title: "Building Effective Security Operations Centers",
      short_description: "Essential components and best practices for modern security operations centers.",
      cover_image_url: "/images/soc.jpg",
      blog: "Security Operations Centers (SOCs) are central to maintaining organizational security. This comprehensive guide covers SOC design, implementation, and optimization. Learn about essential tools, processes, and practices for effective security monitoring, incident detection, and response coordination in modern SOC environments."
    }
  ];
  
  
const BlogPostPage = ({ params }: { params: { slug: string } }) => {
  // Find the current blog post based on the slug
  const currentPost = cybersecurityBlogs.find(post => 
    post.title.toLowerCase().replace(/\s+/g, '-') === params.slug
  );

  if (!currentPost) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Blog Not Found</h1>
          <Link 
            href="/blog" 
            className="text-blue-500 hover:text-blue-400"
          >
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  // Get related posts from the same category
  const relatedPosts = cybersecurityBlogs
    .filter(post => 
      post.category === currentPost.category && 
      post.title !== currentPost.title
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative h-96 w-full">
        <Image
          src={currentPost.cover_image_url}
          alt={currentPost.title}
          fill
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm">
              {currentPost.category}
            </span>
            <h1 className="text-4xl font-bold mt-4 mb-4">
              {currentPost.title}
            </h1>
            <p className="text-gray-300">
              {currentPost.short_description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <article className="prose prose-invert">
          <p className="text-lg leading-relaxed">
            {currentPost.blog}
          </p>
        </article>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="bg-gray-800">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-2xl font-bold mb-8">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((post, index) => (
                <Link
                  key={index}
                  href={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-gray-700 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
                >
                  <div className="relative h-48">
                    <Image
                      src={post.cover_image_url}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-blue-400 text-sm">
                      {post.category}
                    </span>
                    <h3 className="font-bold mt-2 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2">
                      {post.short_description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPostPage;
