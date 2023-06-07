import React from "react";
import { useCallback, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    RefreshControl,
    Share,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter, useSearchParams } from "expo-router";

import {
    Company,
    JobAbout,
    JobFooter,
    JobTabs,
    ScreenHeaderBtn,
    Specifics,
} from "../../components";
import { COLORS, SIZES, icons } from "../../constants";
import useFetch from "../../hooks/useFetch";

const JobDetails = () => {
    const params = useSearchParams();
    const router = useRouter();

    const { data, isLoading, error, refresh } = useFetch("job-details", {
        job_id: params.id,
    });

    const handleShare = async (url) => {
        try {
            const result = await Share.share({
                message: `${url}`,
            });
        } catch (sharingError) {
            alert(sharingError.message);
        }
    };

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {};

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension="60%"
                            handlePress={() => router.back()}
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.share}
                            dimension="60%"
                            handlePress={() =>
                                handleShare(data[0].job_google_link)
                            }
                        />
                    ),
                    headerTitle: "",
                }}
            />
            <>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    {isLoading ? (
                        <ActivityIndicator
                            size="large"
                            color={COLORS.primary}
                        />
                    ) : error ? (
                        <Text>Something went wrong</Text>
                    ) : data.length === 0 ? (
                        <Text>No data</Text>
                    ) : (
                        <View
                            style={{
                                padding: SIZES.medium,
                                paddingBottom: 100,
                            }}
                        >
                            <Company />
                            <JobTabs />
                        </View>
                    )}
                </ScrollView>
            </>
        </SafeAreaView>
    );
};

export default JobDetails;
