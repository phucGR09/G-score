import { apiRequest } from '@/utils/api-request';
import {
  ApiResponse,
  StudentScoreResponse,
} from '@/types/api.types';

export const scoreApi = {
  getStudentScores: async (sbd: string): Promise<ApiResponse<StudentScoreResponse>> => {
    return apiRequest.get<ApiResponse<StudentScoreResponse>>(`/scores/${sbd}`);
  },
};
