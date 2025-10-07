export interface ProfileData {
  projectType: string;
  confidence: 'high' | 'medium' | 'low';
  keyFiles: string[];
  keyDirectories: string[];
  keyGlobals: string[];
}

export type Confidence = 'high' | 'medium' | 'low';

export interface ProjectType {
  type: string;
  confidence: Confidence;
}
