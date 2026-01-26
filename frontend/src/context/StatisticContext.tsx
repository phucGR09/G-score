'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SubjectStatistics, TopStudentResponse, CountScoreResponse, CountStudentResponse } from '@/types/api.types';
import { statisticsApi } from '@/services/statisticsApi';

interface StatisticContextType {
  statistics: SubjectStatistics | null;
  topStudents: TopStudentResponse[] | null;
  countScores: CountScoreResponse | null;
  countStudent: CountStudentResponse | null;
  isLoading: boolean;
  error: string | null;
  refetchStatistics: () => Promise<void>;
  refetchTopStudents: (group?: string) => Promise<void>;
  refetchCountScores: () => Promise<void>;
  refetchCountStudent: () => Promise<void>;
}

const StatisticContext = createContext<StatisticContextType | undefined>(undefined);

export const useStatistic = () => {
  const context = useContext(StatisticContext);
  if (!context) {
    throw new Error('useStatistic must be used within StatisticProvider');
  }
  return context;
};

interface StatisticProviderProps {
  children: ReactNode;
}

export const StatisticProvider: React.FC<StatisticProviderProps> = ({ children }) => {
  const [statistics, setStatistics] = useState<SubjectStatistics | null>(null);
  const [topStudents, setTopStudents] = useState<TopStudentResponse[] | null>(null);
  const [countScores, setCountScores] = useState<CountScoreResponse | null>(null);
  const [countStudent, setCountStudent] = useState<CountStudentResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetchStatistics = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await statisticsApi.getStatistics();
      setStatistics(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch statistics');
    } finally {
      setIsLoading(false);
    }
  };

  const refetchTopStudents = async (group: string = 'A') => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await statisticsApi.getTopStudents(group);
      setTopStudents(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch top students');
    } finally {
      setIsLoading(false);
    }
  };

  const refetchCountScores = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await statisticsApi.getCountScores();
      setCountScores(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch count scores');
    } finally {
      setIsLoading(false);
    }
  };

  const refetchCountStudent = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await statisticsApi.getCountStudent();
      setCountStudent(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch count student');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refetchStatistics();
    refetchTopStudents();
    refetchCountScores();
    refetchCountStudent();
  }, []);

  const value: StatisticContextType = {
    statistics,
    topStudents,
    countScores,
    countStudent,
    isLoading,
    error,
    refetchStatistics,
    refetchTopStudents,
    refetchCountScores,
    refetchCountStudent,
  };

  return <StatisticContext.Provider value={value}>{children}</StatisticContext.Provider>;
};
