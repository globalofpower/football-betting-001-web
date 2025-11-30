import { fetchApi } from "..";
import {  FOOTBALL_BET_API } from "../apis";

export const footballBetService = async (data: any) => fetchApi({ api: FOOTBALL_BET_API, data, method: "POST" });
