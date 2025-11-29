import { gql } from "@apollo/client";

export const GET_USER_INFO_DATA = gql`
  query Auth ($setActive: Boolean) {
    auth (set_active: $setActive) {
      id
      status
      usercode
      role_name
      is_disable_slot
      balance {
        main_balance
        __typename @client
      }
      __typename @client
    }
  }
`;

export const GET_FIXTURES_DATA = ({market,match}:any) => {
  
  return gql`
  query MatchQuery(
    $source: String
    $status: String
    $isPublished: Boolean
    $pageSize: Int
    $page: Int
    $isPerlay: Boolean
    $markets: [String]
    $matchStages: [String]
    $date: String
    $sorting: String
  ) {
    matches(
      source: $source
      status: $status
      is_published: $isPublished
      pageSize: $pageSize
      page: $page
      is_perlay: $isPerlay
      markets: $markets
      match_stages: $matchStages
      date: $date
      sorting: $sorting
    ) {
      id
      host_team_data {
        name_en
        name_mm
        code
      }
      guest_team_data {
        name_en
        name_mm
        code
      }
      league_data {
        name_en
        name_mm
      }
      fixture_timestamp
      fixture_start_time
      is_popular_match
      ${
        fullTimeTypeQuery({market,match}) || firstHalfTypeQuery({market,match}) ?
        `
          odds {
            ${
              fullTimeTypeQuery({market,match})
            }
            ${
              firstHalfTypeQuery({market,match})
            }
          }
        `:""
      }
    }
  }
 `};

  const fullTimeTypeQuery = ({market,match}:any) => {
    // console.log("market", market);
    // console.log("match", match);
    return match?.includes("full_time") ? 
      `full_time {
          odds_team
          ${
            (match?.includes("full_time") && market?.includes("mm_odds")) ? `
                ou_mm_odds
                hdp_mm_odds
                is_published_mm_odds
            `:""
          }
          ${
            (match?.includes("full_time") && market?.includes("odd_even")) ? `
                odd
                even
                is_published_odd_even
            `:""
          }
          ${
            (match?.includes("full_time") && market?.includes("1x2")) ? `
                one
                x
                two
                is_published_1x2
            `:""
          } 
      }`: ""
  };
  const firstHalfTypeQuery = ({market,match}:any) => {
    // console.log("market", market);
    // console.log("match", match);
    return match?.includes("first_half") ? 
      `first_half {
          odds_team
          ${
            (match?.includes("first_half") && market?.includes("mm_odds")) ? `
                ou_mm_odds
                hdp_mm_odds
                is_published_mm_odds
            `:""
          }
      }`: ""
  };

  // is_published_correct_score
// correct_scores {
//   full_time {
//     header
//     name
//     odds
//     id
//   }
// }

export const GET_RESULT_DATA = gql`
  query MatchQuery(
    $source: String
    $status: String
    $pageSize: Int
    $page: Int
    $date: String
    $sorting: String
  ) {
    matches(
      source: $source
      status: $status
      pageSize: $pageSize
      page: $page
      date: $date
      sorting: $sorting
    ) {
      id
      fixture_id
      ft_goals {
        home
        away
        __typename @client
      }
      fh_goals {
        home
        away
        __typename @client
      }
      live_goals {
        home
        away
        __typename @client
      }
      host_team_data {
        id
        name_en
        name_mm
        code
        cc
        __typename @client
      }
      guest_team_data {
        id
        name_en
        name_mm
        code
        cc
        __typename @client
      }
      league_data {
        id
        name_en
        name_mm
        cc
        __typename @client
      }
      fixture_timestamp
      fixture_start_time
      __typename @client
    }
  }
`;

export const GET_FAV_DATA = gql`
  query MatchQuery($matchesId: [Int]) {
    matchesByIds(matches_id: $matchesId) {
      id
      fixture_id
      ft_goals {
        home
        away
        __typename @client
      }
      live_goals {
        home
        away
        __typename @client
      }
      host_team_data {
        id
        name_en
        name_mm
        code
        cc
        __typename @client
      }
      guest_team_data {
        id
        name_en
        name_mm
        code
        cc
        __typename @client
      }
      league_data {
        id
        name_en
        name_mm
        cc
        __typename @client
      }
      fixture_timestamp
      fixture_start_time
      __typename @client
    }
  }
`;

export const GET_BET_LISTS_DATA = gql`
  query BetHistory(
    $page: Int
    $pageSize: Int
    $search: String
    $startDate: String
    $endDate: String
    $betResult: String
    $betType: String
  ) {
    bettings(
      page: $page
      pageSize: $pageSize
      search: $search
      start_date: $startDate
      end_date: $endDate
      bet_result: $betResult
      bet_type: $betType
    ) {
      data {
        id
        amount
        bet_type
        payout_amount
        remark
        status
        bet_result
        created_at
        betting_transaction_id
        reward_transaction_id
        selected_matches {
          id
          bet_result
          market
          match_stage
          team
          status
          odds_team
          match_data {
            host_team_data {
              id
              name_en
              name_mm
              code
              cc
              __typename @client
            }
            guest_team_data {
              id
              name_en
              name_mm
              code
              cc
              __typename @client
            }
            league_data {
              id
              name_en
              name_mm
              cc
              __typename @client
            }
            fixture_start_time
            fixture_timestamp
            __typename @client
          }
          __typename @client
        }
        __typename @client
      }
      meta {
        total
        page
        pageSize
      }
    }
  }
`;

export const GET_BET_LIST_DATA = gql`
  query BetListQuery($id: BigInt!) {
    betting(id: $id) {
      id
      amount
      bet_type
      bet_result
      payout_amount
      remark
      status
      created_at
      betting_transaction_id
      reward_transaction_id
      selected_matches {
        id
        bet_result
        market
        match_stage
        team
        status
        odds
        odds_team
        match_data {
          host_team_data {
            name_en
            name_mm
            code
          }
          guest_team_data {
            name_en
            name_mm
            code
          }
          league_data {
            name_en
            name_mm
          }
          fixture_start_time
          fixture_timestamp
          ft_goals {
            home
            away
          }
          fh_goals {
            home
            away
          }
          live_goals {
            home
            away
          }
          ft_status
          fh_status
        }
      }
    }
  }
`;

export const GET_GOAL_DATA = gql`
  query GoalQuery($bettingId: BigInt!) {
    betting(id: $bettingId) {
      selected_matches {
        id
        match_data {
          fh_goals {
            home
            away
            __typename @client
          }
          live_goals {
            home
            away
            __typename @client
          }
          ft_goals {
            home
            away
            __typename @client
          }
          __typename @client
        }
        __typename @client
      }
      __typename @client
    }
  }
`;

export const GET_WALLET_HISTORY_DATA = gql`
  query WalletTransactions(
    $pageSize: Int
    $page: Int
    $search: String
    $startDate: String
    $endDate: String
    $type: String
    $transactionType: String
  ) {
    walletTransactions(
      pageSize: $pageSize
      page: $page
      search: $search
      start_date: $startDate
      end_date: $endDate
      type: $type
      transaction_type: $transactionType
    ) {
      data {
        id
        user {
          usercode
        }
        amount
        type
        transaction_type
        before
        after
        remark
        created_at
      }
      meta {
        total
        page
        pageSize
      }
    }
  }
`;

export const GET_WALLET_HISTORY_DETAIL_HISTORY = gql`
  query WalletTransaction($walletTransactionId: BigInt!) {
    walletTransaction(id: $walletTransactionId) {
      id
      amount
      type
      transaction_type
      before
      after
      remark
      created_at
    }
  }
`;


export const GET_TAX_PERCENT_DATA = gql`
  query TaxPercents {
    taxPercents {
      id
      min_parlay_count
      max_parlay_count
      percent
      match_stage
      is_popular_match
      market
    }
  }
`;
