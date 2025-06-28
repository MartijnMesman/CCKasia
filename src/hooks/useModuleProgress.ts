'use client'

import { useState, useEffect } from 'react'

interface ModuleProgress {
  completedModules: number[]
  progressPercentage: number
}

const STORAGE_KEY = 'module-progress'
const TOTAL_MODULES = 11

export function useModuleProgress() {
  const [completedModules, setCompletedModules] = useState<number[]>([])
  const [progressPercentage, setProgressPercentage] = useState(0)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const data: ModuleProgress = JSON.parse(stored)
        setCompletedModules(data.completedModules || [])
        setProgressPercentage(data.progressPercentage || 0)
      }
    } catch (error) {
      console.error('Failed to load module progress:', error)
    }
  }, [])

  // Calculate progress percentage
  const calculateProgress = (modules: number[]): number => {
    return Math.round((modules.length / TOTAL_MODULES) * 100)
  }

  // Save to localStorage
  const saveToStorage = (modules: number[]) => {
    try {
      const progress = calculateProgress(modules)
      const data: ModuleProgress = {
        completedModules: modules,
        progressPercentage: progress
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      setProgressPercentage(progress)
    } catch (error) {
      console.error('Failed to save module progress:', error)
    }
  }

  // Complete a module
  const completeModule = (moduleId: number) => {
    setCompletedModules(prev => {
      if (prev.includes(moduleId)) {
        return prev // Already completed
      }
      const updated = [...prev, moduleId].sort((a, b) => a - b)
      saveToStorage(updated)
      return updated
    })
  }

  // Reset progress (optional utility)
  const resetProgress = () => {
    setCompletedModules([])
    setProgressPercentage(0)
    localStorage.removeItem(STORAGE_KEY)
  }

  // Check if module is completed
  const isModuleCompleted = (moduleId: number): boolean => {
    return completedModules.includes(moduleId)
  }

  return {
    completedModules,
    progressPercentage,
    completeModule,
    resetProgress,
    isModuleCompleted
  }
}