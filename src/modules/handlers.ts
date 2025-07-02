export function handleLikeButton() {
  const likeButtons = document.querySelectorAll(
    ".like-button"
  ) as NodeListOf<HTMLElement>;

  likeButtons.forEach((likeButton) => {
    likeButton.addEventListener("click", (event) => {
      const likeButton = event.currentTarget as HTMLElement;

      const parentElementDatasetId = likeButton.parentElement?.dataset.cardId;
      const sameCards = document.querySelectorAll(
        `[data-card-id="${parentElementDatasetId}"]`
      );
      sameCards.forEach((card) => {
        const likeButton = card.querySelector(".like-button") as HTMLElement;
        likeButton?.classList.toggle("like-button__liked");
      });

      const savedLikes = localStorage.getItem("savedLikes");
      const savedLikesArray = JSON.parse(savedLikes || "[]");
      if (savedLikesArray.includes(parentElementDatasetId)) {
        savedLikesArray.splice(
          savedLikesArray.indexOf(parentElementDatasetId),
          1
        );
      } else {
        savedLikesArray.push(parentElementDatasetId);
      }

      localStorage.setItem("savedLikes", JSON.stringify(savedLikesArray));
    });
  });
}

export function handleCategoryCardClick() {
  const categoriesButton = document.getElementById(
    "categories-button"
  ) as HTMLButtonElement;

  categoriesButton.addEventListener("click", () => {
    categoriesButton.textContent?.trim() === "View All Categories"
      ? (categoriesButton.textContent = "Hide Categories")
      : (categoriesButton.textContent = "View All Categories");

    const categoriesDetails = document.getElementById(
      "categories__details"
    ) as HTMLDetailsElement;
    categoriesDetails.open = !categoriesDetails.open;
  });
}

export function restoreLikes() {
  const savedLikes = localStorage.getItem("savedLikes");
  const savedLikesArray = JSON.parse(savedLikes || "[]");

  savedLikesArray.forEach((id: string) => {
    const parentElement = document.querySelectorAll(
      `[data-card-id="${id}"]`
    ) as NodeListOf<HTMLElement> | null;

    parentElement?.forEach((element) => {
      const likeButton = element.querySelector(".like-button") as HTMLElement;
      likeButton?.classList.add("like-button__liked");
    });
  });
}
