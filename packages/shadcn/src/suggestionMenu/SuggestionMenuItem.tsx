import { assertEmpty } from "@blocknote/core";
import { ComponentProps, elementOverflow, mergeRefs } from "@blocknote/react";
import { forwardRef, useEffect, useRef } from "react";

import { cn } from "../lib/utils";
import { useShadCNComponentsContext } from "../ShadCNComponentsContext";

export const SuggestionMenuItem = forwardRef<
  HTMLDivElement,
  ComponentProps["SuggestionMenu"]["Item"]
>((props, ref) => {
  const ShadCNComponents = useShadCNComponentsContext()!;

  const { className, item, isSelected, onClick, id, ...rest } = props;

  assertEmpty(rest);

  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!itemRef.current || !isSelected) {
      return;
    }

    const overflow = elementOverflow(itemRef.current);

    if (overflow === "top") {
      itemRef.current.scrollIntoView(true);
    } else if (overflow === "bottom") {
      itemRef.current.scrollIntoView(false);
    }
  }, [isSelected]);

  return (
    <div
      // Styles from ShadCN DropdownMenuItem component
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      ref={mergeRefs([ref, itemRef])}
      id={id}
      onClick={onClick}
      role="option"
      aria-selected={isSelected || undefined}>
      {item.icon && (
        <div className="p-3" data-position="left">
          {item.icon}
        </div>
      )}
      <div className="flex-1">
        <div className="text-base">{item.title}</div>
        <div className="text-xs">{item.subtext}</div>
      </div>
      {item.badge && (
        <div data-position="right" className="text-xs">
          <ShadCNComponents.Badge.Badge variant={"secondary"}>
            {item.badge}
          </ShadCNComponents.Badge.Badge>
        </div>
      )}
    </div>
  );
});
