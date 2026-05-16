export interface AnalyticsSummary {
  total_conversations: number;
  total_messages: number;
  total_tokens: number;
  containment_rate: number;       // 0–100
  avg_resolution_time: number;    // seconds
  avg_response_time_ms: number;
}
 
export interface ChartDataPoint {
  date: string;
  value: number;
}
 
export interface TopicDistribution {
  label: string;
  value: number;
}
 
export interface AnalyticsReport {
  period_days: number;
  summary: AnalyticsSummary;
  conversation_volume: ChartDataPoint[];
  topic_distribution: TopicDistribution[];
}