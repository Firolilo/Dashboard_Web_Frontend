function toggleCardVisibility(cardId) {
    const card = document.getElementById(cardId);
    const checkbox = document.getElementById(`checkbox-${cardId.split('-')[1]}`);

    if (checkbox.checked) {
        card.style.display = "block";
    } else {
        card.style.display = "none";
    }
}
