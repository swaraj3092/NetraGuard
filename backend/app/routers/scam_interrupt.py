from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import List
import json
import asyncio

router = APIRouter(prefix="/ws", tags=["Scam Interrupt"])

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

manager = ConnectionManager()

@router.websocket("/scam-interrupt")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            # In a real app, this data would be live audio/text stream from a call.
            # Here we parse the mock text and run heuristic stage checks.
            text_lower = data.lower()
            stage = 0
            overlay = "NONE"
            
            # Simple heuristic matching for real-time demo
            tactics = 0
            if any(w in text_lower for w in ["cbi", "customs", "police"]): tactics += 1
            if any(w in text_lower for w in ["arrest", "warrant", "frozen"]): tactics += 1
            if any(w in text_lower for w in ["secret", "don't tell"]): tactics += 1
            if any(w in text_lower for w in ["pay", "transfer"]): tactics += 1
            
            stage = tactics
            if stage >= 3:
                overlay = "RED_INTERRUPT"
            elif stage >= 1:
                overlay = "YELLOW_WARNING"
                
            response = {
                "received": data,
                "detected_stage": stage,
                "overlay_action": overlay
            }
            await manager.send_personal_message(json.dumps(response), websocket)
            
    except WebSocketDisconnect:
        manager.disconnect(websocket)
