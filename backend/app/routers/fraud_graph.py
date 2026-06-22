from fastapi import APIRouter
from typing import List
from app.models.schemas import FIRData, GraphResponse, GraphNode, GraphEdge
import uuid

router = APIRouter(prefix="/api/graph", tags=["Fraud Network Graph"])

# Mock in-memory database for hackathon demo
mock_nodes = [
    GraphNode(id="V1", group=1, label="Victim: Rahul"),
    GraphNode(id="P1", group=2, label="Phone: +919876543210"),
    GraphNode(id="A1", group=3, label="Mule Account: 1234567890"),
]
mock_edges = [
    GraphEdge(source="V1", target="P1", relationship="Called By"),
    GraphEdge(source="V1", target="A1", relationship="Transferred To"),
]

@router.get("/network", response_model=GraphResponse)
def get_network_graph():
    """Returns the current state of the fraud network graph."""
    return GraphResponse(nodes=mock_nodes, edges=mock_edges)

@router.post("/ingest")
def ingest_fir(data: FIRData):
    """
    Ingests a new FIR and dynamically updates the graph.
    If the scammer_phone or scammer_upi already exists, it links the new victim to the existing node,
    demonstrating the cross-victim network discovery.
    """
    victim_id = f"V_{str(uuid.uuid4())[:4]}"
    mock_nodes.append(GraphNode(id=victim_id, group=1, label=f"Victim: {data.victim_name}"))
    
    if data.scammer_phone:
        phone_node_id = f"P_{data.scammer_phone}"
        # Check if phone node exists
        if not any(n.id == phone_node_id for n in mock_nodes):
            mock_nodes.append(GraphNode(id=phone_node_id, group=2, label=f"Phone: {data.scammer_phone}"))
        mock_edges.append(GraphEdge(source=victim_id, target=phone_node_id, relationship="Called By"))
        
    if data.scammer_upi:
        upi_node_id = f"U_{data.scammer_upi}"
        if not any(n.id == upi_node_id for n in mock_nodes):
            mock_nodes.append(GraphNode(id=upi_node_id, group=3, label=f"UPI: {data.scammer_upi}"))
        mock_edges.append(GraphEdge(source=victim_id, target=upi_node_id, relationship="Transferred To"))
        
    return {"status": "success", "message": "FIR ingested and graph updated."}
