import wolf1 from './wolf1.jpg'
import wolf2 from './wolf2.jpg'
import wolf3 from './wolf3.jpg'
import wolf4 from './wolf4.jpg'
import wolf5 from './wolf5.jpg'
import birthday1 from './birthday1.jpg'
import birthday2 from './birthday2.jpg'
import birthday3 from './birthday3.jpg'
import rose1 from './rose1.jpg'
import rose2 from './rose2.jpg'
import rose3 from './rose3.jpg'
import rose4 from './rose4.jpg'
import space1 from './space1.jpg'
import space2 from './space2.jpg'
import space3 from './space3.jpg'

import header from './header.jpg'
import logo from './logo.png'
import settings from './settings.png'


export const assets = {
  header,
  logo,
  settings
}

export const projects = [
  {
    _id: "1",
    project_name: "SpaceXYZ",
    customer_name: "Karen",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur  luctus dolor rhoncus mollis bibendum. Praesent vestibulum, dolor dapibus maximus sodales, ex ex euismod tellus, a maximus ipsum nunc auctor  lacus. Nunc turpis felis, vehicula quis porta ac, rhoncus quis nisi.  Donec aliquam tortor eu magna luctus tristique. Donec lacus mi,  efficitur quis pharetra nec, consectetur eget felis. Praesent eget  ultricies lorem. Sed volutpat accumsan purus non gravida. Aenean at  metus in lorem pellentesque dignissim sed ac diam.",
    images: [space1, space2, space3],
    notes: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "Curabitur  luctus dolor rhoncus mollis bibendum.", "Praesent vestibulum, dolor dapibus maximus sodales, ex ex euismod tellus, a maximus ipsum nunc auctor  lacus."],
    paid: true,
    date: 1716634345448,
    duedate: 1716634345448,
  },
  {
    _id: "2",
    project_name: "Rose Project",
    customer_name: "Simon",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur  luctus dolor rhoncus mollis bibendum. Praesent vestibulum, dolor dapibus maximus sodales, ex ex euismod tellus, a maximus ipsum nunc auctor  lacus. Nunc turpis felis, vehicula quis porta ac, rhoncus quis nisi.  Donec aliquam tortor eu magna luctus tristique. Donec lacus mi,  efficitur quis pharetra nec, consectetur eget felis. Praesent eget  ultricies lorem. Sed volutpat accumsan purus non gravida. Aenean at  metus in lorem pellentesque dignissim sed ac diam.",
    images: [rose1, rose2, rose3, rose4],
    notes: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "Curabitur  luctus dolor rhoncus mollis bibendum.", "Praesent vestibulum, dolor dapibus maximus sodales, ex ex euismod tellus, a maximus ipsum nunc auctor  lacus."],
    paid: false,
    date: 1716634345448,
    duedate: "",
  },
  {
    _id: "3",
    project_name: "Wolf Project",
    customer_name: "Bob",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur  luctus dolor rhoncus mollis bibendum. Praesent vestibulum, dolor dapibus maximus sodales, ex ex euismod tellus, a maximus ipsum nunc auctor  lacus. Nunc turpis felis, vehicula quis porta ac, rhoncus quis nisi.  Donec aliquam tortor eu magna luctus tristique. Donec lacus mi,  efficitur quis pharetra nec, consectetur eget felis. Praesent eget  ultricies lorem. Sed volutpat accumsan purus non gravida. Aenean at  metus in lorem pellentesque dignissim sed ac diam.",
    images: [wolf1, wolf2, wolf3, wolf4, wolf5],
    notes: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "Curabitur  luctus dolor rhoncus mollis bibendum.", "Praesent vestibulum, dolor dapibus maximus sodales, ex ex euismod tellus, a maximus ipsum nunc auctor  lacus."],
    paid: true,
    date: 1716634345448,
    duedate: "",
  },
  {
    _id: "4",
    project_name: "Birthday Art",
    customer_name: "Kent",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur  luctus dolor rhoncus mollis bibendum. Praesent vestibulum, dolor dapibus maximus sodales, ex ex euismod tellus, a maximus ipsum nunc auctor  lacus. Nunc turpis felis, vehicula quis porta ac, rhoncus quis nisi.  Donec aliquam tortor eu magna luctus tristique. Donec lacus mi,  efficitur quis pharetra nec, consectetur eget felis. Praesent eget  ultricies lorem. Sed volutpat accumsan purus non gravida. Aenean at  metus in lorem pellentesque dignissim sed ac diam.",
    images: [birthday1, birthday2, birthday3],
    notes: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "Curabitur  luctus dolor rhoncus mollis bibendum.", "Praesent vestibulum, dolor dapibus maximus sodales, ex ex euismod tellus, a maximus ipsum nunc auctor  lacus."],
    paid: true,
    date: 1716634345448,
    duedate: "",
  },
]