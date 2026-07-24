import React from "react";
import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { Avatar } from "@/components/ui/avatar";
import { SectionHeader } from "@/components/sections/section-header";
import { colors, fonts } from "@/lib/theme";

export type Partner = {
  id: string;
  name: string;
  logoUri?: string;
  hasNews?: boolean; // anneau coloré si le partenaire a une actu non lue
};

type PartnersSectionProps = {
  partners: Partner[];
  onPressPartner?: (partner: Partner) => void;
  onPressSeeAll?: () => void;
};

/**
 * PartnersSection — rangée de cercles façon "stories". L'anneau
 * dégradé signale un partenaire avec une actualité non lue ; les autres
 * restent en anneau neutre, pour ne pas transformer chaque partenaire
 * en notification permanente.
 */
export function PartnersSection({
  partners,
  onPressPartner,
  onPressSeeAll,
}: PartnersSectionProps) {
  return (
    <View>
      <SectionHeader
        title="Partenaires"
        onPressAction={onPressSeeAll}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {partners.map((partner) => (
          <Pressable
            key={partner.id}
            onPress={() => onPressPartner?.(partner)}
            style={styles.item}
          >
            <Avatar
              uri={partner.logoUri}
              fallback={partner.name}
              size="lg"
              ring={partner.hasNews ? "gradient" : "solid"}
              ringColor={partner.hasNews ? undefined : colors.border}
            />
            <Text numberOfLines={1} style={styles.name}>
              {partner.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 20,
    gap: 16,
  },
  item: {
    alignItems: "center",
    width: 70,
    gap: 6,
  },
  name: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
    color: colors.inkSoft,
    textAlign: "center",
  },
});

export default PartnersSection;