export interface TraceStep {
  stepNumber: number;
  key: number | string;
  originalHash: number;
  currentIndex: number;
  probeNumber: number;
  action: 'calculate_hash' | 'probe' | 'collision' | 'insert' | 'search_match' | 'search_empty' | 'chain_append' | 'bucket_append' | 'bucket_overflow';
  status: 'occupied' | 'empty' | 'collision' | 'probing' | 'inserted' | 'found' | 'not_found';
  message: string;
  tableSnapshot: (TableSlot | null)[];
}

export interface TableSlot {
  index: number;
  key: number | string;
  value?: string;
  probeCount?: number;
}

export interface ChainingSlot {
  index: number;
  nodes: (number | string)[];
}

export interface BucketSlot {
  index: number;
  capacity: number;
  items: (number | string)[];
}

export type HashMethod = 'digit_selection' | 'digit_addition' | 'grouped_addition' | 'modulo';
export type CollisionMethod = 'linear_probing' | 'quadratic_probing' | 'double_hashing' | 'bucket' | 'separate_chaining';

export interface HashCalcResult {
  method: HashMethod;
  inputKey: string | number;
  numericKey: number;
  hashValue: number;
  steps: string[];
  explanation: string;
}

export interface TextConversionResult {
  text: string;
  asciiValues: { char: string; ascii: number }[];
  azValues: { char: string; az: number }[];
  binary5Bit: { char: string; binary: string }[];
  concatenatedBinary: string;
  hornerCalculation: {
    powers: { char: string; val: number; power: number; term: number }[];
    total: number;
  };
}
