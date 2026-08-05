  import React, { useState } from "react";
  import { View, ScrollView, StyleSheet, ActivityIndicator, Text } from "react-native";
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
  import { colors, fonts } from "@/lib/theme";
  import { useDashboard } from "@/hooks/useDashboard";
  import { useAuth } from "@/hooks/useAuth";

  const defaultPartners = [
    { id: "p1", name: "Campus France", hasNews: true },
    { id: "p2", name: "MEXT", hasNews: false },
    { id: "p3", name: "Chevening", hasNews: true },
    { id: "p4", name: "CI Plus", hasNews: false },
  ];

  export default function AccueilScreen() {
    const [searchVisible, setSearchVisible] = useState(false);
    const { data, isLoading, error } = useDashboard();
    const { user } = useAuth();

    // firstName : plus besoin de deviner data?.user?.name?.split(" ")[0] ?? user?.name...
  // user vient de la Resource, name est garanti non-null si user existe
  const firstName = data?.user?.name?.split(" ")[0] ?? user?.name?.split(" ")[0] ?? "Boursier";

  const bourses = data?.featured && data.featured.length > 0 ? data.featured : mockBourses;
  const posts = data?.recentPosts && data.recentPosts.length > 0 ? data.recentPosts : mockPosts;
  const partners = data?.partners && data.partners.length > 0 ? data.partners : defaultPartners;
    if (isLoading) {
      return (
        <SafeAreaView style={styles.screen} edges={["top"]}>
          <View style={styles.loadingWrap}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Chargement...</Text>
          </View>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={styles.screen} edges={["top"]}>
        <NavBar
          firstName={firstName}
          notificationCount={4}
          onPressSearch={() => setSearchVisible(true)}
          onPressNotifications={() =>
            router.push(
              "/modal?type=info&title=Notifications&message=Tu+as+4+nouvelles+notifications" as any
            )
          }
        />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <SectionHero
            studentFirstName={firstName}
            activeBoursesCount={data?.stats.activeBoursesCount?? mockBourses.length}
            onPressExplore={() => router.push("/(tabs)/bourses" as any)}
          />

          <PartnersSection
            partners={partners}
            onPressPartner={(partner) => router.push(`/partenaire/${partner.id}` as any)}
            onPressSeeAll={() => {}}
          />

          <View style={styles.section}>
            <SectionHeader title="À la une" />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
              <PubCard
                sponsorName={data?.pub?.sponsorName?? "UVCI"}
                headline={data?.pub?.headline?? "Rejoignez-nous pour promouvoir votre activité"}
                subheadline={data?.pub?.subheadline?? "Faites votre pub ici"}
                phone={data?.pub?.phone?? "+225 07 00 51 82 51"}
                ctaLabel="Contacter"
              />  
            </ScrollView>
          </View>

          <View style={styles.section}>
            <SectionHeader title="Bourses en vedette" onPressAction={() => router.push("/(tabs)/bourses" as any)} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
            
            {bourses.map((bourse: any) => (
    <BourseCard
      key={bourse.id}
      title={bourse.title}
      organism={bourse.organism_name}
      countryFlag={bourse.country?.flag_emoji ?? "🌍"}
      countryName={bourse.country?.name ?? "Monde"}
      level={"Tous niveaux"} //  voir remarque ci-dessous
      deadline={bourse.days_remaining != null
        ? new Date(Date.now() + bourse.days_remaining * 86400000)
        : new Date()}
      onPress={() => router.push(`/bourse/${bourse.id}` as any)}
    />
  ))}
            </ScrollView>
          </View>

          <View style={[styles.section, { paddingHorizontal: 20 }]}>
            <SectionHeader title="Publications récentes" onPressAction={() => router.push("/(tabs)/posts" as any)} />
            <View style={styles.postsCol}>
            
            {posts.slice(0, 2).map((post: any) => (
    <PostCard
      key={post.id}
      authorName={post.author?.name ?? "Admin"}
      authorAvatarUri={post.author?.avatar_url ?? undefined}
      isVerified={true}
      timeAgo={post.created_at}
      content={post.content}
      imageUri={post.cover_image_url ?? undefined}
      videoUri={post.video_url ?? undefined}
      likeCount={post.likes_count ?? 0}
      commentCount={post.comments_count ?? 0}
      onPressComment={() => router.push(`/posts/${post.id}` as any)}
    />
  ))}
            </View>
          </View>

          {error && (
            <View style={{ padding: 20 }}>
              <Text style={{ fontFamily: fonts.body, color: colors.inkSoft, textAlign: "center", fontSize: 12 }}>
                Mode hors-ligne - données locales affichées
              </Text>
            </View>
          )}
        </ScrollView>

        <SearchOverlay visible={searchVisible} onClose={() => setSearchVisible(false)} />
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    content: { paddingBottom: 120 },
    section: { marginTop: 24 },
    horizontalList: { paddingHorizontal: 20, gap: 14 },
    postsCol: { gap: 16 },
    loadingWrap: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
    loadingText: { fontFamily: fonts.bodyMedium, color: colors.inkSoft, fontSize: 13 },
  });