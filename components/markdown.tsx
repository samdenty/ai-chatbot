import Link from 'next/link';
import React, { memo, useMemo, useState } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from './code-block';
import { StaggeredText, StaggerProvider } from 'react-ai-flow';

const components: Partial<Components> = {
  // @ts-expect-error
  code: CodeBlock,
  pre: ({ children }) => <StaggeredText>{children}</StaggeredText>,
  ol: ({ node, children, ...props }) => {
    return (
      <ol className="list-decimal list-outside ml-4" {...props}>
        {children}
      </ol>
    );
  },
  li: ({ node, children, ...props }) => {
    return (
      <StaggeredText>
        <li className="py-1" {...props}>
          {children}
        </li>
      </StaggeredText>
    );
  },
  ul: ({ node, children, ...props }) => {
    return (
      <ul className="list-decimal list-outside ml-4" {...props}>
        {children}
      </ul>
    );
  },
  strong: ({ node, children, ...props }) => {
    return (
      <span className="font-semibold" {...props}>
        <StaggeredText>{children}</StaggeredText>
      </span>
    );
  },
  a: ({ node, children, ...props }) => {
    return (
      // @ts-expect-error
      <Link
        className="text-blue-500 hover:underline"
        target="_blank"
        rel="noreferrer"
        {...props}
      >
        <StaggeredText>{children}</StaggeredText>
      </Link>
    );
  },
  h1: ({ node, children, ...props }) => {
    return (
      <h1 className="text-3xl font-semibold mt-6 mb-2" {...props}>
        <StaggeredText>{children}</StaggeredText>
      </h1>
    );
  },
  h2: ({ node, children, ...props }) => {
    return (
      <h2 className="text-2xl font-semibold mt-6 mb-2" {...props}>
        <StaggeredText>{children}</StaggeredText>
      </h2>
    );
  },
  h3: ({ node, children, ...props }) => {
    return (
      <h3 className="text-xl font-semibold mt-6 mb-2" {...props}>
        <StaggeredText>{children}</StaggeredText>
      </h3>
    );
  },
  h4: ({ node, children, ...props }) => {
    return (
      <h4 className="text-lg font-semibold mt-6 mb-2" {...props}>
        <StaggeredText>{children}</StaggeredText>
      </h4>
    );
  },
  h5: ({ node, children, ...props }) => {
    return (
      <h5 className="text-base font-semibold mt-6 mb-2" {...props}>
        <StaggeredText>{children}</StaggeredText>
      </h5>
    );
  },
  h6: ({ node, children, ...props }) => {
    return (
      <h6 className="text-sm font-semibold mt-6 mb-2" {...props}>
        <StaggeredText>{children}</StaggeredText>
      </h6>
    );
  },
  p: ({ node, children, ...props }) => {
    return (
      <p {...props}>
        <StaggeredText>{children}</StaggeredText>
      </p>
    );
  },
};

const remarkPlugins = [remarkGfm];

const NonMemoizedMarkdown = ({ children }: { children: string }) => {
  return (
    <StaggerProvider
      // disabled
      // visualDebug
      maxFps={60}
      streaming={false}
      splitter="line"
      delayTrailing
      animation="gradient-reveal"
      gradientWidth="300px"
      stagger="50%"
      duration={(element) => {
        // if (element.text.innerText.includes('This is an inline code ')) {
        //   return 10000;
        // }
        return 500;
      }}

      // stagger={(element, previousElement) => (previousElement?.duration ?? 0) * 0.4}
    >
      <ReactMarkdown remarkPlugins={remarkPlugins} components={components}>
        {children}
      </ReactMarkdown>
    </StaggerProvider>
  );
};

export const Markdown = memo(
  NonMemoizedMarkdown,
  (prevProps, nextProps) => prevProps.children === nextProps.children,
);
