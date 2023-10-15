import { Observable, map } from 'rxjs';
import { animate, trigger, state, style, transition } from '@angular/animations';
import { AnimationState } from './consts';

// Mine set of animations, I used only one of them in this project
export const Animations = {
  appear: trigger('appear', [
    state(AnimationState.SHOW, style({
      opacity: '{{opacityMaxValue}}',
    }), {params: {opacityMaxValue: '1'}}),
    state(AnimationState.HIDE, style({
      opacity: '{{opacityMinValue}}',
    }), {params: {opacityMinValue: '0'}}),
    transition('* => show', [
      animate('{{duration}}s {{delay}}s ease')
    ], {params: {duration: '0.5', delay: '0'}}),   
    transition('* => hide', [
      animate('0.2s 0s ease')
    ]),   
    transition('* => show', [
      animate('{{duration}}s {{delay}}s ease')
    ], {params: {duration: '0.5', delay: '0'}}),   
  ]),
  scale: trigger('scale', [
    state(AnimationState.SHOW, style({
      transform: 'scale({{scaleShow}})'
    }), {params: {scaleShow: '1'}}),
    state(AnimationState.HIDE, style({
      transform: 'scale({{scaleHide}})'
    }), {params: {scaleHide: '0'}}),
    transition('hide <=> show', [
      animate('{{duration}}s {{delay}}s ease'),
    ], {params: {duration: '0.5', delay: '0'}}),      
  ]),
  transformY: trigger('transformY', [
    state(AnimationState.SHOW, style({
      transform: 'translateY({{translateShow}})'
    }), {params: {translateShow: '0'}}),
    state(AnimationState.HIDE, style({
      transform: 'translateY({{translateHide}})'
    }), {params: {translateHide: '0'}}),
    transition('hide <=> show', [
      animate('{{duration}}s {{delay}}s ease')
    ], {params: {duration: '0.5', delay: '0'}}),     
  ]),
  transformX: trigger('transformX', [
    state(AnimationState.SHOW, style({
      transform: 'translateX({{translateShow}})'
    }), {params: {translateShow: '0'}}),
    state(AnimationState.HIDE, style({
      transform: 'translateX({{translateHide}})'
    }), {params: {translateHide: '0'}}),
    transition('hide <=> show', [
      animate('{{duration}}s {{delay}}s ease')
    ], {params: {duration: '0.5', delay: '0'}}),     
  ]),
  backgroundColor: trigger('backgroundColor', [
    state(AnimationState.SHOW, style({
      backgroundColor: '{{showBackgroundValue}}'
    }), {params: {showBackgroundValue: 'rgb(255, 255, 255)'}}),
    state(AnimationState.HIDE, style({
      backgroundColor: '{{hideBackgroundValue}}'
    }), {params: {hideBackgroundValue: 'rgb(0, 0, 0)'}}),
    transition('hide <=> show', [
      animate('{{duration}}s {{delay}}s ease')
    ], {params: {duration: '0.5', delay: '0'}}),     
  ]),
}

export function animationLoaded(loaded: Observable<boolean>): Observable<AnimationState> { 
  return loaded.pipe(map((isLoaded) => 
    isLoaded ? 
      AnimationState.SHOW : 
      AnimationState.HIDE
    ))
}