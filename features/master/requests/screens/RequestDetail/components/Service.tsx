import BaseAccordion from "@/components/ui/accordion/BaseAccordion";
import { Text } from "react-native";

export function Service({ data }: { data: string[] }) {
  return (
    <BaseAccordion title="Вид сервиса" icon="settings" value='service'>
      {data.map((item, i) => (
        <Text key={i}>
          {i + 1}. {item}
        </Text>
      ))}
    </BaseAccordion>
  );
}
