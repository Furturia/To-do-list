"use client";
import { useParams, useSearchParams } from "next/navigation";

export default function TodoDetail() {
  const usequery = useSearchParams();

  const useparams = useParams();
  const { id } = useparams;
  return <div>{id} {usequery.get("id")}</div>;
}
