import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  homeTitle : string = 'Welcome to Fit-Kit'
  tagLine : string = 'Your personalized fitness and wellness companion.'
  services : string[] = ['Calculate your BMI','Understand your fitness category','Get basic tips to gain or lose weight']
  aboutTitle : string = 'About Fit-Kit'
  about1 : string = 'Fit-Kit is designed to help individuals understand their fitness needs based on BMI and lifestyle habits.'
  about2 : string = 'Many people start gym routines without knowing whether they need to gain or lose weight. Fit-Kit guides you with data-backed suggestions based on your age, weight, height, and activity level.'
  about3 : string = 'This mini-version will help you:'
  aboutServices : string[] = ['Input your basic physical details','Get your BMI and health category','Receive simple advice based on your goals']
}
