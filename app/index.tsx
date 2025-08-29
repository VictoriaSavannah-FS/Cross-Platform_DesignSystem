// component library Overview - AKA: Homepage ---
import { View, Text, Button } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View style={{ padding: 24, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "600", alignSelf: "center" }}>
        Bellatrix
      </Text>
      <Link href="/Docs" asChild>
        <Button title="Documentations" />
      </Link>
      <Link href="/playground" asChild>
        <Button title="Sandbox | Playground" />
      </Link>
      <Link href="/comX" asChild>
        <Button title="Components📍" />
      </Link>
      {/* <Link href="/profile" asChild>
        <Button title="Profile 😎 | ⚙️Settings" />
      </Link> */}
    </View>
  );
}
