import { apiRequest } from '@/utils/api-request';
import {
  ApiResponse,
  SubjectStatistics,
  TopStudentResponse,
  CountScoreResponse,
  CountStudentResponse,
} from '@/types/api.types';

export const statisticsApi = {

  getStatistics: async (): Promise<ApiResponse<SubjectStatistics>> => {
    return apiRequest.get<ApiResponse<SubjectStatistics>>('/statistics');
  },

  getTopStudents: async (group: string = 'A'): Promise<ApiResponse<TopStudentResponse[]>> => {
    return apiRequest.get<ApiResponse<TopStudentResponse[]>>(`/top-students?group=${group}`);
  },

  getCountScores: async (): Promise<ApiResponse<CountScoreResponse>> => {
    return apiRequest.get<ApiResponse<CountScoreResponse>>('/count-scores');
  },

  getCountStudent: async (): Promise<ApiResponse<CountStudentResponse>> => {
    return apiRequest.get<ApiResponse<CountStudentResponse>>('/count-student');
  },
};
