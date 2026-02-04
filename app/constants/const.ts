export const perPage = 4;

interface Button {
    label: string;
    icon: string;
}

export const vehicleEquipment : { [key: string] : Button} = {
    AC: { label: 'AC', icon: 'icon-ac' },
  Automatic: { label: 'Automatic', icon: 'icon-transmission' },
  Kitchen: { label: 'Kitchen', icon: 'icon-kitchen' },
  TV: { label: 'TV', icon: 'icon-tv' },
  Bathroom: { label: 'Bathroom', icon: 'icon-bathroom' },
};

export const vehicleType: {[key: string]: Button} = {
     panelTruck: { label: 'Van', icon: 'icon-van' },
  fullyIntegrated: { label: 'Fully Integrated', icon: 'icon-fully-integrated' },
  alcove: { label: 'Alcove', icon: 'icon-alcove' },
}