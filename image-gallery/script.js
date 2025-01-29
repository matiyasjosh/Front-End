document.addEventListener("DOMContentLoaded", () => {
    const mainImageContainer = document.querySelector(".main-image")
    const thumbnails = document.querySelectorAll(".thumbnails img")
    const nextButton = document.querySelector(".nav-button.next")
    const altTextContainer = document.querySelector(".alt-text-container")
    const altTextElement = document.querySelector(".alt-text")
  
    let currentIndex = 0
  
    function updateMainImage(index) {
      const selectedThumbnail = thumbnails[index]
      const thumbnailRect = selectedThumbnail.getBoundingClientRect()
      const centerX = thumbnailRect.left + thumbnailRect.width / 2
      const centerY = thumbnailRect.top + thumbnailRect.height / 2
  
      const currentImage = mainImageContainer.querySelector("img.current") || mainImageContainer.querySelector("img")
      const nextImage = document.createElement("img")
  
      nextImage.src = selectedThumbnail.src
      nextImage.alt = selectedThumbnail.alt
      nextImage.classList.add("next")
  
      // Set initial position and scale
      nextImage.style.transformOrigin = `${centerX}px ${centerY}px`
      nextImage.style.transform = "scale(0.1)"
      nextImage.style.opacity = "0"
  
      mainImageContainer.appendChild(nextImage)
  
      // Trigger reflow
      nextImage.offsetWidth
  
      // Animate to full size
      nextImage.style.transform = "scale(1)"
      nextImage.style.opacity = "1"
  
      // Update alt text
      updateAltText(selectedThumbnail.alt)
  
      setTimeout(() => {
        if (currentImage) {
          currentImage.remove()
        }
        nextImage.classList.remove("next")
        nextImage.classList.add("current")
      }, 500)
  
      thumbnails.forEach((thumb) => thumb.classList.remove("active"))
      selectedThumbnail.classList.add("active")
  
      // Move the current thumbnail to the end of the list
      const thumbnailContainer = document.querySelector(".thumbnails")
      thumbnailContainer.appendChild(selectedThumbnail)
  
      // Update the index to point to the new position of the thumbnails
      currentIndex = Array.from(thumbnails).indexOf(selectedThumbnail)
    }
  
    function updateAltText(text) {
      altTextElement.textContent = text
      altTextContainer.classList.remove("show")
  
      // Trigger reflow
      altTextContainer.offsetWidth
  
      altTextContainer.classList.add("show")
    }
  
    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener("click", () => updateMainImage(index))
    })
  
    nextButton.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % thumbnails.length
      updateMainImage(currentIndex)
    })
  
    // Initialize with the first image
    updateMainImage(0)
  })
  
  