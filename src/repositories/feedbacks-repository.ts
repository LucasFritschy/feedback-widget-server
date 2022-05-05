export interface FeedbackData {
  type: string
  comment: string
  screenshot: string
}

export interface FeedbacksRepository {
  create: (data: FeedbackData) => Promise<void>
}