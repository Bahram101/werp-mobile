import cn from "clsx";
import React, { FC, PropsWithChildren } from "react";

import { Button, ButtonText } from "@/components/ui/button";
import { PressableProps } from "react-native";

export interface IButton extends PressableProps {
  className?: string;
}

const BaseButton: FC<PropsWithChildren<IButton>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <Button
      variant="solid"
      size="md"
      action="primary"
      className={cn("bg-primary", className)}
      {...rest}
    >
      <ButtonText className="text-white">{children}</ButtonText>
    </Button>
  );
};

export default BaseButton;
