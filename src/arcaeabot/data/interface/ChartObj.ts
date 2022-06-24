import Difficulty from '../class/Difficulty';
import Level from '../class/Level';

export default interface ChartObj {
  title: string,
  englishTitle?: string;
  composer?: string; 
  difficulty: Difficulty; 
  level?: Level;
  const?: number;
  pack?: string;
  requirement?: string;
}