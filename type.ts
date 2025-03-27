export interface Flora {
    _id: number;
    lt_name: string;
    eng_name: string;
    pt_type: string;
    ed_ible: string;
    flow_ering: string;
    ev_ergreen: string;
  }

  export interface Flora2 {
    id: number;
    latin_name: string;
    english_name: string;
    plant_type: string;
    edi_bility: string;
    flower_ing: string;
    ever_green: string;
  }

  export interface ItemProps {
    item: Flora;
  }
  
  export interface StateProps {
    shopping: {
      floraData: [];
      };
  }