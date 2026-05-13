(() => {
  const API_URL = "https://user-analytics-app-backend.onrender.com/api/events";

  const getSessionId = () => {
    let sessionId = localStorage.getItem("session_id");

    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem("session_id", sessionId);
    }

    return sessionId;
  };

  const sendEvent = async (eventData) => {
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });
    } catch (err) {
      console.error("Tracking failed", err);
    }
  };

  const basePayload = () => ({
    session_id: getSessionId(),
    page_url: window.location.href,
    timestamp: new Date(),
  });

  // Page View
  sendEvent({
    ...basePayload(),
    event_type: "page_view",
  });

  // Click Tracking
  document.addEventListener("click", (e) => {
    sendEvent({
      ...basePayload(),
      event_type: "click",
      x: e.clientX,
      y: e.clientY,
    });
  });
})();