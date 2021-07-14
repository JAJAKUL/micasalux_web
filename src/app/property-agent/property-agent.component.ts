import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-agent',
  templateUrl: './property-agent.component.html',
  styleUrls: ['./property-agent.component.scss']
})
export class PropertyAgentComponent implements OnInit {
  agents = agentsArray;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  gotoAgentDetails(){
    this.router.navigate(['/agent-details']);
   }
}
const agentsArray = [
  { 
    name: "John Cole", 
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu orci id",
    imageUrl: "assets/images/agent-person-item-1.png",
  },
  { 
    name: "Alan Doe", 
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu orci id",
    imageUrl: "assets/images/agent-person-item-2.png",
  },
  { 
    name: "Willan Cole", 
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu orci id",
    imageUrl: "assets/images/agent-person-item-3.png",
  },
  { 
    name: "Steve Cole", 
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu orci id",
    imageUrl: "assets/images/agent-person-item-4.png",
  },
  { 
    name: "Alex Doe", 
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu orci id",
    imageUrl: "assets/images/agent-person-item-5.png",
  },
  { 
    name: "Staut Cole", 
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu orci id",
    imageUrl: "assets/images/agent-person-item-6.png",
  },
];