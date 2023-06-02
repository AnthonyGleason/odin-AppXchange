export const toggleElementVisibility = function(classStr){
  const element = document.querySelector(`.${classStr}`);
  if (!element) return 0;
  if(element.classList.contains('flex')){
    element.classList.add('hidden');
    element.classList.remove('flex');
  }else{
    element.classList.remove('hidden');
    element.classList.add('flex');
  }
}