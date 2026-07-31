declare module 'vaul' {
  import * as React from 'react';

  export const Drawer: {
    Root: React.ComponentType<React.PropsWithChildren<Record<string, unknown>>>;
    Trigger: React.ComponentType<React.ButtonHTMLAttributes<HTMLButtonElement>>;
    Portal: React.ComponentType<React.PropsWithChildren<Record<string, unknown>>>;
    Close: React.ComponentType<React.ButtonHTMLAttributes<HTMLButtonElement>>;
    Overlay: React.ComponentType<React.HTMLAttributes<HTMLDivElement>>;
    Content: React.ComponentType<React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }>;
    Title: React.ComponentType<React.HTMLAttributes<HTMLHeadingElement>>;
    Description: React.ComponentType<React.HTMLAttributes<HTMLParagraphElement>>;
  };
}

declare module 'input-otp' {
  import * as React from 'react';

  export type OTPInputSlot = {
    char?: React.ReactNode;
    hasFakeCaret?: boolean;
    isActive?: boolean;
  };

  export type OTPInputContextValue = {
    slots: OTPInputSlot[];
  };

  export const OTPInputContext: React.Context<OTPInputContextValue | null>;

  export type OTPInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    containerClassName?: string;
  };

  export const OTPInput: React.ComponentType<OTPInputProps>;
}

declare module 'react-resizable-panels' {
  import * as React from 'react';

  export type PanelGroupProps = React.HTMLAttributes<HTMLDivElement>;
  export type PanelProps = React.HTMLAttributes<HTMLDivElement>;
  export type PanelResizeHandleProps = React.HTMLAttributes<HTMLDivElement>;

  export const PanelGroup: React.ComponentType<PanelGroupProps>;
  export const Panel: React.ComponentType<PanelProps>;
  export const PanelResizeHandle: React.ComponentType<PanelResizeHandleProps>;
}
