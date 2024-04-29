const defaultOptions = {
  active: true,
  breakpoints: {},
}

function numberWithinRange(number, min, max) {
  return Math.min(Math.max(number, min), max)
}

function Fade(userOptions = {}) {
  let emblaApi
  let opacities = []
  let distanceFromPointerDown = 0
  let scrollFriction = 0.68
  let fadeVelocity = 0
  let defaultSettledBehaviour
  function init(emblaApiInstance, optionsHandler) {
    emblaApi = emblaApiInstance
    const { mergeOptions, optionsAtMedia } = optionsHandler
    const optionsBase = mergeOptions(defaultOptions, Fade.globalOptions)
    const allOptions = mergeOptions(optionsBase, userOptions)
    optionsAtMedia(allOptions)
    const selectedSnap = emblaApi.selectedScrollSnap()
    defaultSettledBehaviour = emblaApi.internalEngine().scrollBody.settled
    opacities = emblaApi.scrollSnapList().map((_, index) => {
      return index === selectedSnap ? 1 : 0
    })
    disableTransform()
    positionSlides()
    setOpacities(selectedSnap, 1)
    emblaApi.internalEngine().scrollBody.settled = settled
    emblaApi.on('select', () => {
      const duration = emblaApi.internalEngine().scrollBody.duration()
      if (duration) {
        fadeVelocity = 0
      } else {
        fadeVelocity = 1
        setOpacities(emblaApi.selectedScrollSnap(), 1)
      }
    })
    emblaApi.on('slideFocus', () => {
      setOpacities(emblaApi.selectedScrollSnap(), 1)
    })
    emblaApi.on('pointerDown', () => {
      distanceFromPointerDown = 0
      fadeVelocity = 0
    })
  }
  function destroy() {
    const engine = emblaApi.internalEngine()
    engine.scrollBody.settled = defaultSettledBehaviour
    // TODO...
  }
  function positionSlides() {
    const { scrollSnaps, slideRegistry } = emblaApi.internalEngine()
    const slides = emblaApi.slideNodes()
    scrollSnaps.forEach((scrollSnap, scrollSnapIndex) => {
      const slidesInSnap = slideRegistry[scrollSnapIndex]
      slidesInSnap.forEach((slideIndex) => {
        slides[slideIndex].style.transform = `translateX(${scrollSnap}px)`
      })
    })
  }
  function disableTransform() {
    const { translate, slideLooper } = emblaApi.internalEngine()
    translate.clear()
    translate.toggleActive(false)
    slideLooper.loopPoints.forEach(({ translate }) => {
      translate.clear()
      translate.toggleActive(false)
    })
  }
  function setOpacities(fadeIndex, velocity) {
    const { scrollSnaps } = emblaApi.internalEngine()
    scrollSnaps.forEach((_, index) => {
      const absVelocity = Math.abs(velocity)
      const currentOpacity = opacities[index]
      const nextOpacity =
        index === fadeIndex
          ? currentOpacity + absVelocity
          : currentOpacity - absVelocity
      opacities[index] = numberWithinRange(nextOpacity, 0, 1)
      setOpacity(index)
    })
  }
  function setOpacity(index) {
    const slidesInSnap = emblaApi.internalEngine().slideRegistry[index]
    const opacity = opacities[index]
    slidesInSnap.forEach((slideIndex) => {
      const slideStyle = emblaApi.slideNodes()[slideIndex].style
      slideStyle.opacity = opacity.toFixed(2)
      slideStyle.pointerEvents = opacity > 0.5 ? 'auto' : 'none'
    })
  }
  function settled() {
    const { target, location } = emblaApi.internalEngine()
    const diffToTarget = target.get() - location.get()
    const reachedTarget = Math.abs(diffToTarget) < 1
    const fadeIndex = getFadeIndex()
    scroll(emblaApi)
    if (typeof fadeIndex === 'undefined') return false
    return reachedTarget && opacities[fadeIndex] > 0.999
  }
  function getFadeIndex() {
    const { dragHandler, scrollBody, index } = emblaApi.internalEngine()
    const selectedSnap = emblaApi.selectedScrollSnap()
    if (!dragHandler.pointerDown()) return selectedSnap
    const directionSign = Math.sign(scrollBody.velocity())
    const distanceSign = Math.sign(distanceFromPointerDown)
    const counter = index.clone()
    const nextSnap = counter
      .set(selectedSnap)
      .add(directionSign * -1)
      .get()
    if (distanceSign === -1) {
      if (directionSign === -1) {
        return nextSnap
      } else if (directionSign === 1) {
        return selectedSnap
      }
    }
    if (distanceSign === 1) {
      if (directionSign === -1) {
        return selectedSnap
      } else if (directionSign === 1) {
        return nextSnap
      }
    }
  }
  const scroll = (emblaApi) => {
    const { dragHandler, scrollSnaps, scrollBody, options, target, location } =
      emblaApi.internalEngine()
    const pointerDown = dragHandler.pointerDown()
    const scrollVelocity = scrollBody.velocity()
    const fadeIndex = getFadeIndex()
    if (pointerDown && !scrollVelocity) return
    if (pointerDown) {
      distanceFromPointerDown += scrollVelocity
      fadeVelocity = Math.abs(scrollVelocity / 400) // TODO: Change 400 to a min max variable based on contaier size
    } else {
      if (typeof fadeIndex === 'undefined') return
      fadeVelocity += (1 - opacities[fadeIndex]) / options.duration
      fadeVelocity *= scrollFriction
    }
    if (typeof fadeIndex === 'undefined') return
    setOpacities(fadeIndex, fadeVelocity)
    if (pointerDown && opacities[fadeIndex] >= 0.5) {
      location.set(scrollSnaps[fadeIndex])
      target.set(location)
    }
  }
  const self = {
    name: 'fade',
    options: userOptions,
    init,
    destroy,
  }
  return self
}
Fade.globalOptions = undefined

export { Fade as default }
//# sourceMappingURL=embla-carousel-fade.esm.js.map
