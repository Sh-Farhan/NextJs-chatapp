"use client"

import ConversationFallback from "@/components/shared/conversation/ConversationFallback";
import { useRouter } from "next/navigation"
import { useEffect } from "react";

// import Error from "next/error";

export default function Error({error} : {error: Error}) {
    const router = useRouter();

    useEffect(() => {
        router.push("/conversations")
    }, [error, router])

    return <ConversationFallback/>
}