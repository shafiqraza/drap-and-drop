const draggbles = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');

draggbles.forEach(draggble => {
  
  draggble.addEventListener('dragstart', () => {
    draggble.classList.add("dragging");
  });
  
  draggble.addEventListener('dragend',  () => {
    draggble.classList.remove('dragging')
  });

});

containers.forEach(container => {
  container.addEventListener('dragover', (e) => {
    e.preventDefault();
    const dragItem = document.querySelector('.dragging');
    const afterElement = getElementAfter(container, e.clientY)
    if (afterElement == null) {
      container.appendChild(dragItem)
    } else {
      container.insertBefore(dragItem, afterElement)
    }
  });
});

const getElementAfter = (container, y) => {
  const draggableElements = Array.from(container.querySelectorAll('.draggable:not(.dragging)'));
 
  return draggableElements.reduce((closest, child) => {
    let box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, {offset: Number.NEGATIVE_INFINITY}).element;
}





// 