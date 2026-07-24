import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { NavBar } from "@/components/layouts/Navbar";
import { SectionHero } from "@/components/sections/section-hero";
import { SectionHeader } from "@/components/sections/section-header";
import { PartnersSection } from "@/components/sections/section-partners";
import { PubCard } from "@/components/cards/PubCard";
import { BourseCard } from "@/components/cards/BourseCard";
import { PostCard } from "@/components/cards/PostCard";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { mockBourses } from "@/data/mock-bourses";
import { mockPosts } from "@/data/mock-posts";
import { colors } from "@/lib/theme";

const partners = [
  { id: "p1", name: "Campus France", hasNews: true },
  { id: "p2", name: "DAAD", hasNews: false },
  { id: "p3", name: "Chevening", hasNews: true },
  { id: "p4", name: "UVCI", hasNews: false },
];

export default function AccueilScreen() {
  const [searchVisible, setSearchVisible] = useState(false);

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <NavBar
        firstName="Kader"
        notificationCount={4}
        onPressSearch={() => setSearchVisible(true)}
        onPressNotifications={() => router.push("/modal?type=info&title=Notifications&message=Tu+as+4+nouvelles+notifications")}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <SectionHero
          studentFirstName="Kader"
          activeBoursesCount={mockBourses.length}
          onPressExplore={() => router.push("/(tabs)/bourses")}
        />

        <PartnersSection
          partners={partners}
          onPressPartner={(partner) => router.push(`/partenaire/${partner.id}` as any)}
          onPressSeeAll={() => {}}
        />

        <View style={styles.section}>
          <SectionHeader title="À la une" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          >
            <PubCard
              sponsorName="UVCI"
              headline="Rejoignez-nous pour promouvoir votre activité"
              subheadline="Faites votre pub ici"
              phone="+225 07 00 51 82 51"
              ctaLabel="Contacter"
            />
          </ScrollView>
        </View>

        <View style={styles.section}>
          <SectionHeader
            title="Bourses en vedette"
            onPressAction={() => router.push("/(tabs)/bourses")}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          >
            {mockBourses.map((bourse) => (
              <BourseCard
                key={bourse.id}
                title={bourse.title}
                organism={bourse.organism}
                countryFlag={bourse.countryFlag}
                countryName={bourse.countryName}
                level={bourse.level}
                deadline={new Date(bourse.applicationEnd)}
                onPress={() => router.push(`/bourse/${bourse.id}`)}
              />
            ))}
          </ScrollView>
        </View>

        <View style={[styles.section, { paddingHorizontal: 20 }]}>
          <SectionHeader
            title="Publications récentes"
            onPressAction={() => router.push("/(tabs)/posts")}
          />
          <View style={styles.postsCol}>
            {mockPosts.slice(0, 2).map((post) => (
              <PostCard
                key={post.id}
                authorName={post.authorName}
                authorAvatarUri={post.authorAvatarUri}
                isVerified={post.isVerified}
                timeAgo={post.timeAgo}
                content={post.content}
                imageUri={post.imageUri}
                videoUri={post.videoUri}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                onPressComment={() => router.push(`/posts/${post.id}`)}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <SearchOverlay visible={searchVisible} onClose={() => setSearchVisible(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: 120,
  },
  section: {
    marginTop: 24,
  },
  horizontalList: {
    paddingHorizontal: 20,
    gap: 14,
  },
  postsCol: {
    gap: 16,
  },
});