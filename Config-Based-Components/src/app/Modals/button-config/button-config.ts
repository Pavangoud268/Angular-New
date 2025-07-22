export interface buttonConfig{
  color : string;
  size : 'small' | 'medium' | 'large';
  text : string;
  action : () => void;
}

export interface spinnerConfig{
  color : string;
  type : string;
}
