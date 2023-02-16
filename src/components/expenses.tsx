import { iconType, labelType, paymentMethod } from "@/constants/types";
import { DeleteForever } from "@mui/icons-material";
import {
  AspectRatio,
  Card,
  CardOverflow,
  Chip,
  IconButton,
  Typography,
} from "@mui/joy";

export default function Expenses({
  id,
  name,
  cost,
  owner,
  type,
  payMethod,
  createAt,
  deleteCallback,
}: {
  id: string;
  name: string;
  cost: string;
  owner: string;
  type: string;
  payMethod: string;
  createAt: string;
  deleteCallback: Function;
}) {
  return (
    <>
      <Card
        style={{ margin: "6px 0px", width: 300, position: "relative" }}
        orientation="horizontal"
        variant="outlined"
      >
        <IconButton
          aria-label="Like minimal photography"
          size="md"
          variant="solid"
          color="danger"
          onClick={() => deleteCallback(id, cost, type, payMethod)}
          sx={{
            position: "absolute",
            zIndex: 2,
            borderRadius: "50%",
            right: "1rem",
            top: 0,
            transform: "translateY(50%)",
          }}
        >
          <DeleteForever />
        </IconButton>
        <AspectRatio ratio="1" sx={{ width: 90 }}>
          <div style={{ borderRadius: "100%", padding: "22px" }}>
            <p style={{ fontSize: "36px" }}>{iconType.get(type)}</p>
          </div>
        </AspectRatio>
        <div style={{ marginLeft: "8px" }}>
          <Typography level="h2" fontSize="lg" id="card-description" mb={0.5}>
            {name}
          </Typography>
          <Typography fontSize="sm" aria-describedby="card-description" mb={1}>
            ${cost}
          </Typography>
          <Typography fontSize="xs" aria-describedby="card-description" mb={1}>
            {createAt}
          </Typography>
          <CardOverflow
            style={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <Chip
              color="primary"
              size="sm"
              style={{ margin: 4 }}
              sx={{ pointerEvents: "none" }}
            >
              {owner}
            </Chip>
            <Chip
              color="neutral"
              size="sm"
              style={{ margin: 4 }}
              sx={{ pointerEvents: "none" }}
            >
              {paymentMethod.get(payMethod)}
            </Chip>
            <Chip
              color="warning"
              size="sm"
              style={{ margin: 4 }}
              sx={{ pointerEvents: "none" }}
            >
              {labelType.get(type)}
            </Chip>
          </CardOverflow>
        </div>
      </Card>
    </>
  );
}
