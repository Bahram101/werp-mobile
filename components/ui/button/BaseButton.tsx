import cn from "clsx";
import React, { FC, PropsWithChildren } from "react";

import { Button, ButtonText } from "@/components/ui/button";
import { PressableProps } from "react-native";

export interface IButton extends PressableProps {
  className?: string;
  disabled?: boolean;
}

const BaseButton: FC<PropsWithChildren<IButton>> = ({
  children,
  className,
  disabled,
  ...rest
}) => {
  return (
    <Button
      disabled={disabled}
      variant="solid"
      size="md"
      action="primary"
      className={cn(disabled ? "bg-gray-400" : "bg-primary", className)}
      {...rest}
    >
      <ButtonText className="text-white">{children}</ButtonText>
    </Button>
  );
};

export default BaseButton;
