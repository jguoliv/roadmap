// ---------- State ----------
let activeCategory = "entrees"
let vegetarianOnly = false
let underFiveOnly = false
let currentFoods = []
let currentIndex = 0

// ---------- Elements ----------
const screenHome = document.getElementById("screen-home")
const screenFeed = document.getElementById("screen-feed")
const foodCard = document.getElementById("foodCard")
const emptyMessage = document.getElementById("emptyMessage")
const cardImage = document.getElementById("cardImage")
const peekLeft = document.getElementById("peekLeft")
const peekRight = document.getElementById("peekRight")
const peekLeftImage = document.getElementById("peekLeftImage")
const peekRightImage = document.getElementById("peekRightImage")
const detailSheet = document.getElementById("detailSheet")
const filterModal = document.getElementById("filterModal")
const viewport = document.getElementById("carouselViewport")

// ---------- Drawing ----------
// Show an image if the food has one; hide it if not (or if the file is missing)
function setImage(img, food) {
    if (food && food.imageUrl) {
        img.src = food.imageUrl
        img.classList.remove("hidden")
    } else {
        img.removeAttribute("src")
        img.classList.add("hidden")
    }
}

;[cardImage, peekLeftImage, peekRightImage].forEach(function (img) {
    img.addEventListener("error", function () {
        img.classList.add("hidden")
    })
})

function showCard() {
    const food = currentFoods[currentIndex]

    // Nothing matches the category and filters: show a helpful message
    foodCard.classList.toggle("hidden", !food)
    emptyMessage.classList.toggle("hidden", Boolean(food))
    if (!food) return

    const vendorLine = document.getElementById("cardVendor")
    vendorLine.textContent = "Find it at "
    const vendorName = document.createElement("strong")
    vendorName.textContent = food.vendor
    vendorLine.appendChild(vendorName)

    document.getElementById("cardTitle").textContent = food.name
    document.getElementById("cardPrice").textContent = formatCardPrice(food)

    setImage(cardImage, food)
    cardImage.alt = food.name

    // Previous and next cards peek in from the edges (wrapping around the list)
    const count = currentFoods.length
    const previousFood = currentFoods[(currentIndex - 1 + count) % count]
    const nextFood = currentFoods[(currentIndex + 1) % count]
    peekLeft.classList.toggle("hidden", count < 2)
    peekRight.classList.toggle("hidden", count < 2)
    setImage(peekLeftImage, previousFood)
    setImage(peekRightImage, nextFood)
}

function renderPills() {
    document.querySelectorAll(".pill-btn").forEach(function (pill) {
        const isActive = pill.dataset.category === activeCategory
        pill.classList.toggle("active", isActive)
        pill.setAttribute("aria-pressed", isActive)
    })
}

function makeChip(label, onRemove) {
    const chip = document.createElement("span")
    chip.className = "filter-chip"
    chip.textContent = label

    const removeBtn = document.createElement("button")
    removeBtn.type = "button"
    removeBtn.textContent = "×"
    removeBtn.setAttribute("aria-label", `Remove ${label} filter`)
    removeBtn.addEventListener("click", onRemove)

    chip.appendChild(removeBtn)
    return chip
}

function renderFilterChips() {
    const bar = document.getElementById("activeFilters")
    bar.textContent = ""
    if (vegetarianOnly) {
        bar.appendChild(makeChip("Vegetarian", function () {
            vegetarianOnly = false
            refresh()
        }))
    }
    if (underFiveOnly) {
        bar.appendChild(makeChip("Under $5.00", function () {
            underFiveOnly = false
            refresh()
        }))
    }
}

// ---------- One function rebuilds the list and redraws everything ----------
function refresh() {
    currentFoods = foods.filter(function (food) {
        return food.category === activeCategory
            && (!vegetarianOnly || food.isVegetarian)
            && (!underFiveOnly || food.price < 5)
    })
    currentIndex = 0
    closeSheet()
    renderPills()
    renderFilterChips()
    showCard()
}

function selectCategory(category) {
    activeCategory = category
    refresh()
}

// ---------- Moving through the deck ----------
function moveForward() {
    if (currentFoods.length === 0) return
    currentIndex = (currentIndex + 1) % currentFoods.length
    closeSheet()
    showCard()
}

function moveBackward() {
    if (currentFoods.length === 0) return
    currentIndex = (currentIndex - 1 + currentFoods.length) % currentFoods.length
    closeSheet()
    showCard()
}

// ---------- Screens ----------
function showFeed() {
    screenHome.classList.add("hidden")
    screenFeed.classList.remove("hidden")
}

function showHome() {
    screenFeed.classList.add("hidden")
    screenHome.classList.remove("hidden")
}

document.querySelectorAll(".category-tile").forEach(function (tile) {
    tile.addEventListener("click", function () {
        selectCategory(tile.dataset.category)
        showFeed()
    })
})

document.querySelectorAll(".pill-btn").forEach(function (pill) {
    pill.addEventListener("click", function () {
        selectCategory(pill.dataset.category)
    })
})

document.getElementById("backToHomeBtn").addEventListener("click", showHome)

// ---------- Detail sheet (Learn More) ----------
function openSheet() {
    const food = currentFoods[currentIndex]
    if (!food) return

    document.getElementById("detailDescription").textContent = food.description || ""
    document.getElementById("detailCalories").textContent = food.calories ? `Calories: ${food.calories}` : ""

    const notes = []
    if (food.isVegetarian) notes.push(food.vegetarianOption ? "Vegetarian option available" : "Vegetarian")
    if (food.isSpicy) notes.push("Spicy")
    if (food.allergens.length > 0) notes.push(`Contains: ${food.allergens.join(", ")}`)
    document.getElementById("detailDietary").textContent = notes.join(". ")

    const sizes = document.getElementById("detailSizes")
    sizes.textContent = ""
    food.sizes.forEach(function (size) {
        const line = document.createElement("p")
        line.textContent = `${size.name}: $${size.price.toFixed(2)}` + (size.calories ? ` (${size.calories} cal)` : "")
        sizes.appendChild(line)
    })

    detailSheet.classList.remove("hidden")
}

function closeSheet() {
    detailSheet.classList.add("hidden")
}

document.getElementById("learnMoreBtn").addEventListener("click", openSheet)
document.querySelector(".sheet-handle").addEventListener("click", closeSheet)

// ---------- Filter modal ----------
const vegetarianBox = document.getElementById("filterVegetarian")
const underFiveBox = document.getElementById("filterUnderFive")

function openFilterModal() {
    vegetarianBox.checked = vegetarianOnly
    underFiveBox.checked = underFiveOnly
    filterModal.classList.remove("hidden")
}

function closeFilterModal() {
    filterModal.classList.add("hidden")
}

document.getElementById("openFilterBtn").addEventListener("click", openFilterModal)
document.getElementById("closeFilterModal").addEventListener("click", closeFilterModal)

document.getElementById("applyFiltersBtn").addEventListener("click", function () {
    vegetarianOnly = vegetarianBox.checked
    underFiveOnly = underFiveBox.checked
    closeFilterModal()
    refresh()
})

// ---------- Keyboard ----------
document.addEventListener("keydown", function (event) {
    if (screenFeed.classList.contains("hidden")) return
    if (!filterModal.classList.contains("hidden")) {
        if (event.key === "Escape") closeFilterModal()
        return
    }

    if (event.key === "ArrowLeft") moveBackward()
    else if (event.key === "ArrowRight") moveForward()
    else if (event.key === "Escape") closeSheet()
})

// ---------- Swipe ----------
const swipeThreshold = 50
let startX = null

viewport.addEventListener("pointerdown", function (event) {
    // A press that starts on a button (Learn More) is a tap, not a swipe
    startX = event.target.closest("button") ? null : event.clientX
})

viewport.addEventListener("pointerup", function (event) {
    if (startX === null) return
    const distance = event.clientX - startX
    startX = null

    if (distance < -swipeThreshold) moveForward()
    else if (distance > swipeThreshold) moveBackward()
})

viewport.addEventListener("pointercancel", function () {
    startX = null
})

// ---------- Pick of the day (a different food each day) ----------
const daysSinceEpoch = Math.floor(Date.now() / 86400000)
const dailyPick = foods[daysSinceEpoch % foods.length]
document.getElementById("dealsTrack").innerHTML =
    `<span class="deal-price">${formatCardPrice(dailyPick).replace("From ", "")}</span>` +
    `<span class="deal-label">Pick of the day: ${dailyPick.name} at ${dailyPick.vendor}</span>`

// ---------- Start ----------
refresh()
